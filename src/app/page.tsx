import fs from 'fs';
import Image from 'next/image';
import Link from 'next/link';
import path from 'path';

export default async function Home() {
  const dir = path.join(process.cwd(), 'src', 'content');
  const files = fs.readdirSync(dir);

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, '');
      const mod = await import(`../content/${slug}.mdx`);
      return { slug, metadata: mod.metadata };
    })
  );

  return (
    <div className="w-full flex flex-col items-center px-4 py-12 bg-gradient-to-br from-blue-100 to-yellow-50 min-h-screen">
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="bg-white border border-yellow-300 rounded-2xl overflow-hidden shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-2xl"
          >
            <Image
              src={
                post.metadata.image ||
                `/posts/og-image?title=${encodeURIComponent(post.metadata.title)}`
              }
              alt={post.metadata.title}
              className="w-full object-cover aspect-[1200/630] border-b-4 border-gray-400"
              width={1200}
              height={630}
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-yellow-900 mb-3 transition-colors">
                <Link href={`/posts/${post.slug}`}>{post.metadata.title}</Link>
              </h2>
              <p className="text-sm text-yellow-900 mb-4 line-clamp-3">
                {post.metadata.description}
              </p>
              <Link
                href={`/posts/${post.slug}`}
                className="inline-block text-sm font-medium text-blue-500 hover:underline"
              >
                Read more →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
