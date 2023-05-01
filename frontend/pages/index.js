import { useSelector } from 'react-redux'
import Head from 'next/head'

const Index = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const user = useSelector((state) => state.auth.user)


  console.log("User data in index.js:", user);
  console.log("isAuthenticated:", isAuthenticated);
  
  return (
    <>
      <Head>
        <title>FINE | マイページ</title>
      </Head>

      <div>
        {isAuthenticated && user ? (
          <div>
            <div>ようこそ、 {user.name}さん</div>
            <div>無料会員</div>
            <div className="my-4 border-4 border-dashed border-gray-200 rounded">
              <div className="flex justify-center items-center h-64">無料コンテンツ</div>
            </div>
          </div>
        ) : (
          <div className="text-center text-2x1">全ての人に素敵な出会いのきっかけを提供</div>
        )}
      </div>
    </>
  )
}

export default Index 