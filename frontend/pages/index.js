import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';
import FeatureCard from '../components/FeatureCard';
import PricingCard from '../components/PricingCard';

const Index = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const user = useSelector((state) => state.auth.user)
  const [member, setMember] = useState(false)
  
  useEffect(() => {
    const today = new Date();
    if (user && new Date(user.current_period_end) > today) {
      setMember(true);
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>FINE | マイページ</title>
      </Head>

      {isAuthenticated ? (
        null
      ) :
      <div className="text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">全ての人に素敵な出会いのきっかけを提供</h1>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        プロフィールを作成して自分の良さをアピールしましょう。<br />
        ユーザーとマッチするとダイレクトメッセージができます。<br />
        さらにユーザーは自らイベントを主催することができ、複数人と同時に会うことができます。<br />
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <a
          href="/register"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Get started
        </a>
      </div>
    </div>
    }

      {isAuthenticated && user ? (
        <div>
          <div>ようこそ、 {user.name}さん</div>
          {member ? (
            <div>
              あなたは、{format(new Date(user.current_period_end), 'yyy年MM月dd日')}まで有料会員です
            </div>
          ) : (
            <div>無料会員です</div>
          )}

          {member ? (
            <div className="my-4 border-4 border-dashed border-gray-200 rounded">
              <div className="flex justify-center items-center h-64">有料コンテンツ</div>
            </div>
          ) : (
            <div className="my-4 border-4 border-dashed border-gray-200 rounded">
              <div className="flex justify-center items-center h-64">無料コンテンツ</div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-2x1">
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            全ての人に素敵な出会いのきっかけを提供
          </p>
          <div className="flex flex-wrap justify-center">
            <FeatureCard
              icon={<i className="fas fa-user"></i>}
              title="プロフィール作成"
              description="あなたの趣味や好みを登録し、相性の良い異性とマッチングできます。"
            />
            <FeatureCard
              icon={<i className="fas fa-search"></i>}
              title="高度なマッチング設定"
              description="特別な機能を利用して、さらに効率的な出会いを楽しめます。"
            />
            <FeatureCard
              icon={<i className="fas fa-comments"></i>}
              title="メッセージ機能"
              description="マッチングした異性と直接やりとりができます。"
            />
          </div>
        </div>
      )}
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:text-center">
        <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">選べる3つのプラン</h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">あなたにぴったりのプランを選んでください</p>
      </div>
      <div className="mt-10">
        <div className="flex flex-wrap -mx-4">
          <PricingCard
            title="無料プラン"
            price="無料で利用可能"
            features={['アカウント作成', 'プロフィール', '基本的なマッチング機能']}
            checkoutLink="/checkout"
          />
          <PricingCard
            title="有料プラン"
            price="月額 3000円"
            features={['プロフィール', '特別な機能の利用', '高度なマッチング設定']}
            checkoutLink="/checkout"
          />
          <PricingCard
            title="VIPプラン"
            price="月額 5000円"
            features={['すべての機能を利用', '優先的にリコメンドされる', 'マッチング率の向上']}
            checkoutLink="/checkout"
          />
        </div>
      </div>
    </div>
  </>
); 
}

export default Index
