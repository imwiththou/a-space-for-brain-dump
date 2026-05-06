import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { execSync } from "child_process";
import { BskyAgent } from "@atproto/api";

const POSTS_DIR = "content/posts";
const SITE_URL = "https://blog.imwiththou.com";

// Detect newly added files only
const diff = execSync("git diff --diff-filter=A --name-only HEAD~1 HEAD")
  .toString()
  .split("\n")
  .filter(f => f.startsWith(POSTS_DIR));

if (diff.length === 0) {
  console.log("No new posts detected");
  process.exit(0);
}

const agent = new BskyAgent({ service: "https://bsky.social" });

await agent.login({
  identifier: process.env.BLUESKY_HANDLE,
  password: process.env.BLUESKY_APP_PASSWORD,
});

for (const file of diff) {
  if (!file.endsWith(".md") && !file.endsWith(".mdx")) continue;

  const raw = fs.readFileSync(file, "utf8");
  const { data } = matter(raw);

  const slug = path.basename(file, path.extname(file));
  const url = `${SITE_URL}/posts/${slug}`;

  const title = data.title ?? slug.replace(/-/g, " ");
  const text = `📝 New blog post: ${title} ${url}`;

  await agent.post({ text });
  console.log(`Posted to Bluesky: ${title}`);
}