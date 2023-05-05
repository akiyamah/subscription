import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-3">FINE</h3>
            <p>素敵な出会いのきっかけを提供するアプリ。</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-3">リンク</h3>
            <ul>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  アバウト
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-3">ポリシー</h3>
            <ul>
              <li>
                <Link href="/footer/a" className="text-gray-300 hover:text-white">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/footer/policy" className="text-gray-300 hover:text-white">
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 text-center text-sm text-gray-300">
          &copy; {new Date().getFullYear()} FINE. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
