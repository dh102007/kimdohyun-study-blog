export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex flex-col items-center px-4 py-12 bg-gradient-to-br from-blue-100 to-yellow-50 min-h-screen">
      <div className="max-w-6xl w-full">{children}</div>
    </div>
  );
}
