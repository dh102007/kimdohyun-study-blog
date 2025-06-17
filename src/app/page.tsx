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
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="bg-white rounded-3xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="relative aspect-[1200/630] w-full">
              <Image
                src={
                  post.metadata.image ||
                  `/posts/og-image?title=${encodeURIComponent(post.metadata.title)}`
                }
                alt={post.metadata.title}
                fill
                className="object-cover rounded-t-3xl"
              />
            </div>
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors duration-200">
                  <Link href={`/posts/${post.slug}`}>
                    {post.metadata.title}
                  </Link>
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.metadata.description}
                </p>
              </div>
              <div>
                <Link
                  href={`/posts/${post.slug}`}
                  className="inline-block px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full hover:bg-blue-600 transition-colors"
                >
                  Read more →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
