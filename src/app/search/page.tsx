import { PageShell } from "@/components/shared/page-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { fetchSiteFeed } from "@/lib/site-connector";
import { buildPostUrl, getPostTaskKey } from "@/lib/task-data";
import { getMockPostsForTask } from "@/lib/mock-posts";
import { SITE_CONFIG } from "@/lib/site-config";
import { TaskPostCard } from "@/components/shared/task-post-card";

export const revalidate = 3;

const matchText = (value: string, query: string) =>
  value.toLowerCase().includes(query);

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ");

const compactText = (value: unknown) => {
  if (typeof value !== "string") return "";
  return stripHtml(value).replace(/\s+/g, " ").trim().toLowerCase();
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>;
}) {
  const resolved = (await searchParams) || {};
  const query = (resolved.q || "").trim();
  const normalized = query.toLowerCase();
  const category = (resolved.category || "").trim().toLowerCase();
  const task = (resolved.task || "").trim().toLowerCase();
  const useMaster = resolved.master !== "0";
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster
      ? { fresh: true, category: category || undefined, task: task || undefined }
      : undefined
  );
  const posts =
    feed?.posts?.length
      ? feed.posts
      : useMaster
        ? []
        : SITE_CONFIG.tasks.flatMap((task) => getMockPostsForTask(task.key));

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === "object" ? post.content : {};
    const typeText = compactText((content as any).type);
    if (typeText === "comment") return false;
    const description = compactText((content as any).description);
    const body = compactText((content as any).body);
    const excerpt = compactText((content as any).excerpt);
    const categoryText = compactText((content as any).category);
    const tags = Array.isArray(post.tags) ? post.tags.join(" ") : "";
    const tagsText = compactText(tags);
    const derivedCategory = categoryText || tagsText;
    if (category && !derivedCategory.includes(category)) return false;
    if (task && typeText && typeText !== task) return false;
    if (!normalized.length) return true;
    return (
      matchText(compactText(post.title || ""), normalized) ||
      matchText(compactText(post.summary || ""), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    );
  });

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24);

  return (
    <PageShell
      eyebrow="Discovery"
      title="Search the archive"
      description={
        query
          ? `Showing matches for “${query}” across articles and connected posts.`
          : "Search headlines, summaries, and tags—same dark desk layout as the homepage."
      }
      actions={
        <form action="/search" className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <input type="hidden" name="master" value="1" />
          {category ? <input type="hidden" name="category" value={category} /> : null}
          {task ? <input type="hidden" name="task" value={task} /> : null}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input
              name="q"
              defaultValue={query}
              placeholder="Keywords, topics, authors…"
              className="h-11 border-white/10 bg-white/5 pl-9 text-zinc-100 placeholder:text-zinc-500"
            />
          </div>
          <Button type="submit" className="h-11 bg-sky-500 text-white hover:bg-sky-400">
            Search
          </Button>
        </form>
      }
    >
      {results.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((post) => {
            const task = getPostTaskKey(post);
            const href = task ? buildPostUrl(task, post.slug) : `/posts/${post.slug}`;
            return <TaskPostCard key={post.id} post={post} href={href} />;
          })}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-white/15 bg-[#0c0c0e] p-14 text-center">
          <p className="text-sm font-medium text-zinc-400">No matching stories yet.</p>
          <p className="mt-2 text-xs text-zinc-600">Try a shorter phrase, another category, or clear filters.</p>
        </div>
      )}
    </PageShell>
  );
}
