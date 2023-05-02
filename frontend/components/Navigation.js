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
        <div className="bg-green-600">
          <div className="max-w-7x1 mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center ">
                <img src="/HatchfulExport-All/logo.png" alt="FINE Logo" className="w-12 h-12 mx-2" />
                <Link href="/" className="text-white hover: text-gray-30 font-extrabold text-lg mx-2">FINE</Link>
              </div>
              {isAuthenticated ? (
                 <div className="flex">
                    <Link href="/login" className="button-nav">アカウント</Link>
                    <div onClick={logoutHandler} className="button-nav">ログアウト</div>
                </div>
                ) : (
                <div className="flex">
                  <Link href="/login" className="button-nav">ログイン</Link>
                  <Link href="/register" className="button-nav">アカウント登録</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Navigation;
  