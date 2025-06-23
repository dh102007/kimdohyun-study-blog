export default function Footer() {
  return (
    <footer className='bg-gray-100 py-4'>
      <div className='max-w-6xl mx-auto px-4'>
        <p className='text-center text-sm'>
          &copy; {new Date().getFullYear()} KimDoHyun blog. All rights reserved.<br />
          본 사이트는 넥슨 메이플스토리 공식 글꼴 ‘Maplestory’ 폰트를 사용하고 있습니다.
        </p>
      </div>
    </footer>
  );
}
