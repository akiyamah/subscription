// (frontend/pages/profile/userProfile.js)


//　あなたには(frontend/pages/profile/userProfile.js)の作成の手伝いをして欲しいのです。
//　具体的にはステート、フック、ハンドラ、リターンです。それらを順番にstep by stepで作成します。

//　以下のいくつかの制約を定義します。
// (frontend/pages/profile/userProfile.js)の概要
// このコンポーネントは、ユーザーのプロフィール情報を表示し、編集するためのものです。 
// プロフィール情報は、ユーザー名、性別、誕生日、職業、年収、目的、趣味、 自己紹介、住所（都道府県、市町村）、職場や学校（都道府県、市町村）、画像データ1,2,3を含みます。 
// 初期値はuser_profileに含まれるデータを使用します。
// ユーザーはこれらの値をドロップダウンやチェックボックス、インプットフィールドで更新することが可能な状態にします。
// ただし、住所市町村は住所都道府県に属する住所市町村が表示されます。住所都道府県の値によって住所市町村の表示は切り替わります。
// 職場や学校都道府県と職場や学校市町村の同様です。
// この更新時の選択肢はユーザーが情報を更新する時に提供する選択肢が格納された変数: gender,purpose,hobby,occupation,annualIncome,prefecture,city,にあります。
// ユーザーは、プロフィール情報を編集し、更新ボタンを押すことで変更を保存できます。 
// 更新ボタンを押すと、updateUserProfileアクションが呼び出され、 プロフィール情報がバックエンドに送信され、データベースが更新されます。 
// 画面遷移は実装されておらず、更新後も同じページにとどまります。
// ステートは作成しました。


//フックを作成して下さい。

// ここで問題が発生します。
// まず初期値はuser_profileの各値をセットしたいです。
// 具体的には以下の様な値です。
// この時にドロップダウンやチェックボックスの選択肢、値は以下の様な変数の値を使用します。
// gender,purpose,hobby,occupation,annualIncome,prefecture,city,
// 具体的な値は以下のとおりです。


// この時、ユーザーが選択肢する操作によってフックがデータを更新します。そのフックの処理を作成して欲しいです。
  // Reduxのdispatch関数とstateからプロフィール関連データを取得
  // user_profileの所有する項目{user,username,birthday,gender,occupation,annual_income,purpose
  // hobbies,residence_prefecture,residence_citys,workplace_prefecture,workplace_citys,introduction
  // profile_main_image1,profile_image2,profile_image3} 
  // ユーザーが情報を更新する時に提供する選択肢が格納された変数: gender,purpose,hobby,occupation,annualIncome,prefecture,city,




import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateUserProfile } from '../../actions/userProfile';
import InputField from "../../components/InputField";
import DropdownSelect from "../../components/DropdownSelect";
import CheckboxGroup from "../../components/CheckboxGroup";
import Cropper from 'cropperjs';

const Profile = () => {

const dispatch = useDispatch();
  const {
    userId,
    user_profile,
    gender,
    purpose,
    hobby,
    occupation,
    annualIncome,
    prefecture,
    city,
  } = useSelector((state) => state.profile);

  // ステート:
  const [username, setUsername] = useState('');
  const [selectedGenderId, setSelectedGenderId] = useState(null);
  const [birthday, setBirthday] = useState('');
  const [selectedOccupationId, setSelectedOccupationId] = useState(null);
  const [selectedAnnualIncomeId, setSelectedAnnualIncomeId] = useState(null);
  const [selectedPurposeIds, setSelectedPurposeIds] = useState([]);
  const [selectedHobbyIds, setSelectedHobbyIds] = useState([]);
  const [introduction, setIntroduction] = useState('');
  const [selectedResidencePrefectureId, setSelectedResidencePrefectureId] = useState(null);
  const [selectedResidenceCityIds, setSelectedResidenceCityIds] = useState([]);
  const [selectedWorkplacePrefectureId, setSelectedWorkplacePrefectureId] = useState(null);
  const [selectedWorkplaceCityIds, setSelectedWorkplaceCityIds] = useState([]);
  const [profileMainImage, setProfileMainImage] = useState(null);
  const [profileImage2, setProfileImage2] = useState(null);
  const [profileImage3, setProfileImage3] = useState(null);
  

 // フック
  // ReactのuseEffectフックが使われています。
  // useEffectは、副作用を起こす関数を実行する際に使用されます。
  // 主にデータの取得、更新、削除など非同期処理を行う場合に利用されます。
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  // これは初期値をセットし直しています
  useEffect(() => {
    if (user_profile) {
      setUsername(user_profile.username || '');
      setSelectedGenderId(user_profile.gender?.id || null);
      setBirthday(user_profile.birthday || '');
      setSelectedOccupationId(user_profile.occupation?.id || null);
      setSelectedAnnualIncomeId(user_profile.annual_income?.id || null);
      setSelectedPurposeIds(user_profile.purpose?.map((p) => p.id) || []);
      setSelectedHobbyIds(user_profile.hobbies?.map((h) => h.id) || []);
      setIntroduction(user_profile.introduction || '');
      setSelectedResidencePrefectureId(user_profile.residence_prefecture?.id || null);
      setSelectedResidenceCityIds(user_profile.residence_citys?.map((c) => c.id) || []);
      setSelectedWorkplacePrefectureId(user_profile.workplace_prefecture?.id || null);
      setSelectedWorkplaceCityIds(user_profile.workplace_citys?.map((c) => c.id) || []);
      setProfileMainImage(user_profile.profile_main_image1 || null);
      setProfileImage2(user_profile.profile_image2 || null);
      setProfileImage3(user_profile.profile_image3 || null);
    }
  }, [user_profile]);
  
  
  //ハンドラ
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  
  const handleGenderChange = (e) => {
    setSelectedGenderId(e.target.value);
  };
  
  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value);
  };
  
  const handleOccupationChange = (e) => {
    setSelectedOccupationId(e.target.value);
  };
  
  const handleAnnualIncomeChange = (e) => {
    setSelectedAnnualIncomeId(e.target.value);
  };
  
  const handlePurposeChange = (e) => {
    const target = e.target;
    const value = Number(target.value);
    if (target.checked) {
      setSelectedPurposeIds([...selectedPurposeIds, value]);
    } else {
      setSelectedPurposeIds(selectedPurposeIds.filter((item) => item !== value));
    }
  };
  
  const handleHobbyChange = (e) => {
    const target = e.target;
    const value = Number(target.value);
    if (target.checked) {
      setSelectedHobbyIds([...selectedHobbyIds, value]);
    } else {
      setSelectedHobbyIds(selectedHobbyIds.filter((item) => item !== value));
    }
  };
  
  const handleIntroductionChange = (e) => {
    setIntroduction(e.target.value);
  };
  
  const handleResidencePrefectureChange = (e) => {
    setSelectedResidencePrefectureId(Number(e.target.value));
  };
  
  const handleResidenceCityChange = (e) => {
    const target = e.target;
    const value = Number(target.value);
    if (target.checked) {
      setSelectedResidenceCityIds([...selectedResidenceCityIds, value]);
    } else {
      setSelectedResidenceCityIds(selectedResidenceCityIds.filter((item) => item !== value));
    }
  };
  
  const handleWorkplacePrefectureChange = (e) => {
    setSelectedWorkplacePrefectureId(Number(e.target.value));
    setSelectedWorkplaceCityIds([]); // 職場・学校の都道府県が変更されたとき、市町村の選択をリセットします。
  };

  
  const handleWorkplaceCityChange = (e) => {
    const target = e.target;
    const value = Number(target.value);
    if (target.checked) {
      setSelectedWorkplaceCityIds([...selectedWorkplaceCityIds, value]);
    } else {
      setSelectedWorkplaceCityIds(selectedWorkplaceCityIds.filter((item) => item !== value));
    }
  };
  
  
  const handleProfileMainImageChange = (e) => {
    setProfileMainImage(e.target.files[0]);
  };
  
  const handleProfileImage2Change = (e) => {
    setProfileImage2(e.target.files[0]);
  };
  
  const handleProfileImage3Change = (e) => {
    setProfileImage3(e.target.files[0]);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formattedUserProfile = {
      user: userId,
      username: username,
      gender: { id: parseInt(selectedGenderId), name: gender.find(g => g.id === parseInt(selectedGenderId)).name },
      birthday: birthday,
      occupation: { id: parseInt(selectedOccupationId), name: occupation.find(o => o.id === parseInt(selectedOccupationId)).name },
      annual_income: { id: parseInt(selectedAnnualIncomeId), name: annualIncome.find(a => a.id === parseInt(selectedAnnualIncomeId)).name },
      purpose: selectedPurposeIds.map(id => ({ id: id, name: purpose.find(p => p.id === id).name })),
      hobbies: selectedHobbyIds.map(id => ({ id: id, name: hobby.find(h => h.id === id).name })),
      introduction: introduction,
      residence_prefecture: { id: parseInt(selectedResidencePrefectureId), name: prefecture.find(p => p.id === parseInt(selectedResidencePrefectureId)).name },
      residence_citys: selectedResidenceCityIds.map(id => ({ id: id, name: city.find(c => c.id === id).name, prefecture_id: parseInt(selectedResidencePrefectureId) })),
      workplace_prefecture: { id: parseInt(selectedWorkplacePrefectureId), name: prefecture.find(p => p.id === parseInt(selectedWorkplacePrefectureId)).name },
      workplace_citys: selectedWorkplaceCityIds.map(id => ({ id: id, name: city.find(c => c.id === id).name, prefecture_id: parseInt(selectedWorkplacePrefectureId) })),
      profile_main_image1: profileMainImage,
      profile_image2: profileImage2,
      profile_image3: profileImage3,
    };
  
    dispatch(updateUserProfile(formattedUserProfile));
  };
  
  

  return (
    <div>
      <h1>プロフィール編集</h1>
      <form onSubmit={handleSubmit}>
        <InputField
          label="ユーザー名"
          value={username}
          onChange={handleUsernameChange}
        />
        <DropdownSelect
          label="性別"
          options={gender}
          selectedValue={selectedGenderId}
          onChange={handleGenderChange}
        />
        <InputField
          label="誕生日"
          value={birthday}
          onChange={handleBirthdayChange}
          type="date"
        />
        <DropdownSelect
          label="職業"
          options={occupation}
          selectedValue={selectedOccupationId}
          onChange={handleOccupationChange}
        />
        <DropdownSelect
          label="年収"
          options={annualIncome}
          selectedValue={selectedAnnualIncomeId}
          onChange={handleAnnualIncomeChange}
        />
        <CheckboxGroup
          label="目的"
          options={purpose}
          selectedValues={selectedPurposeIds}
          onChange={handlePurposeChange}
        />
        <CheckboxGroup
          label="趣味"
          options={hobby}
          selectedValues={selectedHobbyIds}
          onChange={handleHobbyChange}
        />
        <InputField
          label="自己紹介"
          value={introduction}
          onChange={handleIntroductionChange}
          type="textarea"
        />
        <DropdownSelect
          label="住所（都道府県）"
          options={prefecture}
          selectedValue={selectedResidencePrefectureId}
          onChange={handleResidencePrefectureChange}
        />
        {selectedResidencePrefectureId && (
          <CheckboxGroup
            label="住所（市町村）"
            options={city.filter((c) => c.prefecture_id === selectedResidencePrefectureId)}
            selectedValues={selectedResidenceCityIds} // 修正: selectedValueからselectedValuesに変更
            onChange={handleResidenceCityChange}
          />
        )}
        <DropdownSelect
          label="職場・学校（都道府県）"
          options={prefecture}
          selectedValue={selectedWorkplacePrefectureId}
          onChange={handleWorkplacePrefectureChange}
        />
        {selectedWorkplacePrefectureId && (
          <CheckboxGroup
            label="職場・学校（市町村）"
            options={city.filter((c) => c.prefecture_id === selectedWorkplacePrefectureId)}
            selectedValue={selectedWorkplaceCityIds}
            onChange={handleWorkplaceCityChange}
          />
        )}
        <InputField
          label="プロフィール画像1"
          onChange={handleProfileMainImageChange}
          type="file"
        />
        <InputField
          label="プロフィール画像2"
          onChange={handleProfileImage2Change}
          type="file"
        />
        <InputField
          label="プロフィール画像3"
          onChange={handleProfileImage3Change}
          type="file"
        />
        <button type="submit">更新</button>
      </form>
    </div>
  );
};

export default Profile;


