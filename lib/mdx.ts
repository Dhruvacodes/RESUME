import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ideasDirectory = path.join(process.cwd(), "content", "ideas");

export interface IdeaFrontmatter {
  title: string;
  date: string;
  description: string;
  tags?: string[];
}

export interface IdeaPost {
  slug: string;
  frontmatter: IdeaFrontmatter;
  content: string;
}

export function getAllIdeas(): IdeaPost[] {
  if (!fs.existsSync(ideasDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(ideasDirectory);
  const allIdeas = fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(ideasDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        frontmatter: data as IdeaFrontmatter,
        content,
      };
    });

  return allIdeas.sort((a, b) =>
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

export function getIdeaBySlug(slug: string): IdeaPost | null {
  const fullPath = path.join(ideasDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data as IdeaFrontmatter,
    content,
  };
}
