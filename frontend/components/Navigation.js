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
        <div className="bg-violet-600">
          <div className="max-w-7x1 mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <Link href="/" className="text-white hover: text-gray-30 font-extrabold text-lg">FINE</Link>
              </div>
              {isAuthenticated ? (
                <div onClick={logoutHandler} className="bg-green-500 text-white py-2 px-4 rounded-full mx-2">ログアウト</div>
              ) : (
                <div>
                  <Link href="/login" className="bg-green-500 text-white py-2 px-4 rounded-full mx-2">ログイン</Link>
                  <Link href="/register" className="bg-green-500 text-white py-2 px-4 rounded-full mx-2">アカウント登録</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Navigation;
  