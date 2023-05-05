// pages/products.js
// pages/products.js
import { useSelector } from 'react-redux';
import Head from 'next/head';
import FeatureCard from '../components/FeatureCard';

const Products = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const user = useSelector((state) => state.auth.user)

  return (
    <>
      <Head>
        <title>FINE | 製品</title>
      </Head>

      <div className="text-center text-2x1">
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          全ての人に素敵な出会いのきっかけを提供するマッチングプラットフォーム
        </p>
        <div className="flex flex-col items-center space-y-4">
          <FeatureCard
            icon={<i className="fas fa-user"></i>}
            title="プロフィール作成"
            description="あなたの趣味や好みを登録し、相性の良い異性とマッチングできます。最適なプロフィールで相手にアピールしましょう。"
          />
          <FeatureCard
            icon={<i className="fas fa-search"></i>}
            title="高度なマッチング設定"
            description="特別な機能を利用して、さらに効率的な出会いを楽しめます。条件を絞り込んで、理想の相手に出会いましょう。"
          />
          <FeatureCard
            icon={<i className="fas fa-comments"></i>}
            title="メッセージ機能"
            description="マッチングした異性と直接やりとりができます。コミュニケーションを通じて、相手との距離を縮めましょう。"
          />
          <FeatureCard
            icon={<i className="fas fa-calendar-alt"></i>}
            title="イベント企画"
            description="興味を共有する人たちとイベントを企画しましょう。新しい出会いを楽しみながら、共通の趣味を共有できます。"
          />
        </div>
      </div>
    </>
  );
}

export default Products;
