import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import Link from 'next/link';

const Index = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const user = useSelector((state) => state.auth.user)
  const [member, setMember] = useState(false)

  console.log("User data in index.js:", user);
  console.log("isAuthenticated:", isAuthenticated);

  useEffect(( ) => {
    const today = new Date()
    if (user && new Date(user.current_period_end) > today) {
      setMember (true)
    }
    }, [user])
  
  return ( 
    <>
      <Head>
        <title>FINE | マイページ</title>
      </Head>

      <div>
        {isAuthenticated && user ? (
          <div>
            <div>ようこそ、 {user.name}さん</div>
            {member ? (
              <div>あなたは、{format(new Date(user.current_period_end), 'yyy年MM月dd日')}まで有料会員です</div>
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
          <div className="text-center text-2x1">全ての人に素敵な出会いのきっかけを提供</div>
        )}
      </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">選べる3つのプラン</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              あなたにぴったりのプランを選んでください
            </p>
          </div>
          
          <div className="mt-10">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full px-4 md:w-1/3">
                <div className="plan-card">
                  <h3 className="plan-title">無料プラン</h3>
                  <p className="plan-price">無料で利用可能</p>
                  <ul className="plan-feature">
                    <li>アカウント作成</li>
                    <li>プロフィール</li>
                    <li>基本的なマッチング機能</li>
                  </ul>
                  <Link href="/checkout"><button className="plan-button">選択する</button></Link>
                </div>
              </div>

              <div className="w-full px-4 md:w-1/3">
                <div className="plan-card">
                  <h3 className="plan-title">有料プラン</h3>
                  <p className="plan-price">月額 3000円</p>
                  <ul className="plan-feature">
                    <li>プロフィール</li>
                    <li>特別な機能の利用</li>
                    <li>高度なマッチング設定</li>
                  </ul>
                  <Link href="/checkout"><button className="plan-button">選択する</button></Link>
                </div>
              </div>
              <div className="w-full px-4 md:w-1/3">
                <div className="plan-card">
                  <h3 className="plan-title">VIPプラン</h3>
                  <p className="plan-price">月額 5000円</p>
                  <ul className="plan-feature">
                    <li>すべての機能を利用</li>
                    <li>優先的にリコメンドされる</li>
                    <li>マッチング率の向上</li>
                  </ul>
                  <Link href="/checkout"><button className="plan-button">選択する</button></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </>
  )
}

export default Index 