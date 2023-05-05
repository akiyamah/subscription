// バックエンドのユーザー情報を返すAPIにリクエストするAPI
// frontend/pages/api/account/getUserProfile.js
import cookie from 'cookie';

export default async (req, res) => {
  console.log('// frontend/pages/api/account/getUserProfile.js アクションが呼び出されました', req.body);
  if (req.method === 'GET') {
    console.log('Get method');
    const cookies = cookie.parse(req.headers.cookie ?? '');
    const access = cookies.access ?? false;

    if (access === false) {
      console.log(' アクセストークンがありません ');
      return res.status(401).json({ error: 'アクセストークンがありません' });
    }
    try {
      console.log('try 処理開始');
      const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/user-profile/`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${access}` },
      });
      const data = await apiRes.json();

      if (apiRes.status === 200) {
        console.log(`プロフィール情報取得に成功: ${data.user.name}`);
        console.log(data.user_profile)
        // console.log('プロフィール更新に必要な選択肢情報');
        // console.log('############## data.genderを表示');
        // console.log(data.gender)
        // console.log('############## data.purposeを表示');
        // console.log(data.purpose)
        // console.log('############## data.hobbyを表示');
        // console.log(data.hobby)
        // console.log('############## data.occupationを表示');
        // console.log(data.occupation)
        // console.log('############## data.annualIncomeを表示');
        // console.log(data.annualIncome)
        // console.log("############## data.prefectureを表示");
        // console.log(data.prefecture)
        // console.log("data.city");
        // console.log(data.city)

        return res.status(200).json({
          userId: data.user.id,
          user_profile: data.user_profile,
          gender: data.gender,
          purpose: data.purpose,
          hobby: data.hobby,
          occupation: data.occupation,
          annualIncome: data.annualIncome,
          area: data.area,
          prefecture: data.prefecture,
          city: data.city,
        });
      } else {
        return res.status(apiRes.status).json({ error: 'プロフィール情報取得に失敗しました' });
      }
    } catch (err) {
      console.log('catch 通過');
      return res.status(500).json({ error: 'プロフィール情報取得に失敗しました' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};
