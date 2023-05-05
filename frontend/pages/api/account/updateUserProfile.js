// バックエンドAPIと通信するための処理(API)です。
// frontend/pages/api/account/updateUserProfile.js
// (frontend/actions/profile.js)のupdateUserProfile関数からcallされます。
// リクエスト送信先: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/user-profile/`

// 今回は"handler = nc();"を使用する。 next-connect
// これは.put()、.post()、.get() などのメソッドをチェーンして追加できます。
// これにより、リクエストメソッドごとに処理を分離でき、コードがより整理されます。


import nc from "next-connect";
import cookie from 'cookie';

const handler = nc();

handler.post(async (req, res) => {

    console.log('frontend/pages/api/account/updateUserProfile.js 起動');
    console.log(req.body);
    console.log(req.body.username);
  const userProfile = req.body;


  const cookies = cookie.parse(req.headers.cookie ?? '');
  const access = cookies.access ?? false;

  if (access === false) {
    console.log('アクセストークンがありません');
    return res.status(401).json({ error: 'アクセストークンがありません' });
  }

  try {
    console.log('updateUserProfile アクションが呼び出されました', userProfile);

    const body = JSON.stringify(userProfile);

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/user-profile/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access}`,
        },
        body: body,
      }
    );
    console.log(apiRes.status);

    const data = await apiRes.json();
    if (apiRes.status === 200) {
      console.log('if 通過 status 200: プロフィールが更新されました');
      return res.status(200).json({ success: "プロフィールが更新されました" });
    } else {
      console.log('if-else 通過 プロフィール情報更新に失敗しました');

      return res.status(apiRes.status).json({ error: "プロフィール情報更新に失敗しました" });
    }
  } catch (err) {
    console.log('catch 通過 プロフィール情報更新に失敗しました');
    return res.status(500).json({ error: "プロフィール情報更新に失敗しました" });
  }
});

handler.get(async (req, res) => {
    // GETメソッドの処理
    res.status(405).json({ message: "GETメソッドはサポートされていません" });
  });

export default handler;
