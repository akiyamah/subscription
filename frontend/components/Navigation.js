import { useSelector, useDispatch } from 'react-redux' 
import Link from 'next/link'
import { logout } from '../actions/auth'


const Navigation = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const logoutHandler = async () => {
      if (dispatch && dispatch !== null && dispatch !== undefined) {
        await dispatch(logout());
      }
    };
    
    return (
        <>
          <div className="bg-gray-800 text-white">
            <div className="max-w-7x1 mx-auto px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center ">
                  <img src="/HatchfulExport-All/logo.png" alt="FINE Logo" className="w-12 h-12 mx-2" />
                  <Link href="/" className="text-white hover:text-gray-300 font-extrabold text-lg mx-3">FINE</Link>
                </div>
                  <div className="flex items-center">
                    <Link href="/products" className="text-white hover:text-gray-300 font-extrabold text-lg mx-4">製品</Link>
                    <Link href="/pricing" className="text-white hover:text-gray-300 font-extrabold text-lg mx-4">料金</Link>
                    <Link href="/profile/userProfile" className="text-white hover:text-gray-300 font-extrabold text-lg mx-4">プロフィール</Link>
                    <Link href="/events/events" className="text-white hover:text-gray-300 font-extrabold text-lg mx-4">イベント企画</Link>
                    <Link href="/search-users/searchUsers" className="text-white hover:text-gray-300 font-extrabold text-lg mx-4">ユーザー検索</Link>
                    <Link href="/search-events/searchEvents" className="text-white hover:text-gray-300 font-extrabold text-lg mx-4">イベント検索</Link>
                    <Link href="/recommend-matching/recommendMatching.js" className="text-white hover:text-gray-300 font-extrabold text-lg mx-4">リコメンドマッチング</Link>
                    <Link href="/messages/messageList" className="text-white hover:text-gray-300 font-extrabold text-lg mx-4">メッセージ</Link>
                  </div>
                {isAuthenticated ? (
                  <div className="flex">
                    <Link href="/notices" className="button-indigo">通知</Link>
                    <Link href="/account-settings" className="button-indigo">アカウント設定</Link>
                    <div onClick={logoutHandler} className="button-indigo">ログアウト</div>
                  </div>
                ) : (
                  <div className="flex">
                    <Link href="/login" className="button-indigo">ログイン</Link>
                    <Link href="/register" className="button-indigo">アカウント登録</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
    );
    
    
}
  
  export default Navigation;
  