import Layout from '../components/Layout';
import PricingCard from '../components/PricingCard';
import Head from 'next/head';


export default function Products() {
  return (
    <>
        <Head>
            <title>FINE | 料金</title>
        </Head>
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
              features={['基本的なマッチング機能', 'イベント企画', '限定的なダイレクトメッセージ']}
              checkoutLink="/checkout"
            />
            <PricingCard
              title="有料プラン"
              price="月額 3000円"
              features={['無料プランの全て', '高度なマッチング設定', '無制限なダイレクトメッセージ']}
              checkoutLink="/checkout"
            />
            <PricingCard
              title="VIPプラン"
              price="月額 5000円"
              features={['無料プランの全て','高度なマッチング設定', '優先的なリコメンド']}
              checkoutLink="/checkout"
            />
          </div>
        </div>
      </div>
    </>
  );
}
