# backend/operation/insert_data.py

import os
import django

import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parent.parent))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings')
django.setup()

from accounts.models import Gender
from accounts.models import Gender, Purpose, Occupation, Hobby, AnnualIncome, Prefecture, City, UserProfile
# 以下は変更なし



def insert_data(model, data_list):
    for item in data_list:
        if not model.objects.filter(name=item).exists():
            new_item = model(name=item)
            new_item.save()
            print(f'Added {item} to the database.')

def insert_data_with_foreign_key(model, data_dict):
    for key, values in data_dict.items():
        if model == Prefecture:
            area = Area.objects.get(name=key)
            for value in values:
                if not model.objects.filter(name=value, area=area).exists():
                    new_item = model(name=value, area=area)
                    new_item.save()
                    print(f'Added {value} to the database under {key}.')
        elif model == City:
            prefecture = Prefecture.objects.get(name=key)
            for value in values:
                if not model.objects.filter(name=value, prefecture=prefecture).exists():
                    new_item = model(name=value, prefecture=prefecture)
                    new_item.save()
                    print(f'Added {value} to the database under {key}.')


if __name__ == '__main__':

    # Prefecture data
    prefectures = [
        "北海道", "青森県", "岩手県", "宮城県", "秋田県",
        "山形県", "福島県", "茨城県", "栃木県", "群馬県",
        "埼玉県", "千葉県", "東京都", "神奈川県", "新潟県",
        "富山県", "石川県", "福井県", "山梨県", "長野県",
        "岐阜県", "静岡県", "愛知県", "三重県", "滋賀県",
        "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県",
        "鳥取県", "島根県", "岡山県", "広島県", "山口県",
        "徳島県", "香川県", "愛媛県", "高知県", "福岡県",
        "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県",
        "鹿児島県", "沖縄県"
    ]
    insert_data(Prefecture, prefectures)

    city_dict = {
        '北海道': ['札幌市', '函館市', '旭川市', '帯広市', '釧路市'],
        
        '青森県': ['青森市', '弘前市', '八戸市', '黒石市', 'むつ市'],
        '岩手県': ['盛岡市', '一関市', '宮古市', '大船渡市', '花巻市'],
        '宮城県': ['仙台市', '石巻市', '塩竈市', '気仙沼市', '白石市'],
        '秋田県': ['秋田市', '横手市', '大館市', '男鹿市', '由利本荘市'],
        '山形県': ['山形市', '米沢市', '酒田市', '新庄市', '上山市'],
        '福島県': ['福島市', '郡山市', 'いわき市', '会津若松市', '白河市'],
        '茨城県': ['水戸市', '日立市', '土浦市', '古河市', '石岡市'],
        
        '栃木県': ['宇都宮市', '足利市', '小山市', '佐野市', '鹿沼市'],
        '群馬県': ['前橋市', '高崎市', '伊勢崎市', '太田市', '沼田市'],
        '埼玉県': ['さいたま市', '川越市', '熊谷市', '所沢市', '草加市'],
        '千葉県': ['千葉市', '銚子市', '松戸市', '野田市', '市川市'],
        '東京都': ['渋谷区', '新宿区', '台東区', '江東区', '世田谷区'],
        '神奈川県': ['横浜市', '川崎市', '相模原市', '藤沢市', '横須賀市'],
        
        '新潟県': ['新潟市', '長岡市', '上越市', '柏崎市', '三条市'],
        '富山県': ['富山市', '高岡市', '魚津市', '滑川市', '黒部市'],
        '石川県': ['金沢市', '七尾市', '小松市', '輪島市',],

        '福井県': ['福井市', '敦賀市', '小浜市', '大野市', '勝山市'],
        '山梨県': ['甲府市', '富士吉田市', '都留市', '山梨市', '大月市'],
        '長野県': ['長野市', '松本市', '諏訪市', '須坂市', '飯田市'],
        '岐阜県': ['岐阜市', '大垣市', '高山市', '多治見市', '関市'],
        '静岡県': ['静岡市', '浜松市', '沼津市', '熱海市', '富士市'],
        '愛知県': ['名古屋市', '豊橋市', '岡崎市', '一宮市', '瀬戸市'],
        '三重県': ['津市', '四日市市', '伊勢市', '鈴鹿市', '松阪市'],
        '滋賀県': ['大津市', '彦根市', '長浜市', '草津市', '守山市'],
        '京都府': ['京都市', '福知山市', '舞鶴市', '宇治市', '長岡京市'],
        '大阪府': ['大阪市', '堺市', '豊中市', '高槻市', '松原市'],
        '兵庫県': ['神戸市', '姫路市', '尼崎市', '明石市', '西宮市'],
        '奈良県': ['奈良市', '大和高田市', '大和郡山市', '天理市', '橿原市'],
        '和歌山県': ['和歌山市', '海南市', '橋本市', '有田市', '田辺市'],
        '鳥取県': ['鳥取市', '米子市', '倉吉市', '境港市', '岩美町'],
        '島根県': ['松江市', '出雲市', '浜田市', '益田市', '安来市'],
        '岡山県': ['岡山市', '倉敷市', '津山市', '玉野市', '笠岡市'],
        '広島県': ['広島市', '福山市', '尾道市', '呉市', '竹原市'],
        '山口県': ['山口市', '下関市', '宇部市', '防府市', '長門市'],
        '徳島県': ['徳島市', '鳴門市', '小松島市', '阿南市', '吉野川市'],
        '香川県': ['高松市', '丸亀市', '坂出市', '善通寺市', '観音寺市'],
        '愛媛県': ['松山市', '今治市', '宇和島市', '八幡浜市', '新居浜市'],
        '高知県': ['高知市', '室戸市', '安芸市', '南国市', '香南市'],
        '福岡県': ['福岡市', '北九州市', '久留米市', '直方市', '飯塚市'],
        '佐賀県': ['佐賀市', '唐津市', '鳥栖市', '多久市', '伊万里市'],
        '長崎県': ['長崎市', '佐世保市', '島原市', '諫早市', '大村市'],
        '熊本県': ['熊本市', '八代市', '人吉市', '荒尾市', '水俣市'],
        '大分県': ['大分市', '別府市', '中津市', '日田市', '佐伯市'],
        '宮崎県': ['宮崎市', '都城市', '延岡市', '日南市', '小林市'],
        '鹿児島県': ['鹿児島市', '鹿屋市', '枕崎市', '阿久根市', '出水市'],
        '沖縄県': ['那覇市', '宜野湾市', '石垣市', '浦添市', '名護市'],
        'その他': ['その他'],
    }
    insert_data_with_foreign_key(City, city_dict)
    
    # Gender data
    gender_list = [
        '男性',
        '女性',
        'Non-Binary',
        'その他',
    ]
    insert_data(Gender, gender_list)

    # Purpose data
    purpose_list = [
        '友達を作る',
        '恋人を探す',
        '趣味友達',
        'ビジネス',
        'その他',
    ]
    insert_data(Purpose, purpose_list)

    # Occupation data
    occupation_list = [
        '未登録',
        '会社員',
        '公務員',
        '自営業',
        '学生',
        'その他',
    ]
    insert_data(Occupation, occupation_list)

    # Hobby data
    hobby_list = [
        'スポーツ',
        '音楽',
        '映画',
        '読書',
        '旅行',
        'その他',
    ]
    insert_data(Hobby, hobby_list)

    # AnnualIncome data
    annual_income_list = [
        '200万円未満',
        '200万円〜400万円',
        '400万円〜600万円',
        '600万円〜800万円',
        '800万円〜1000万円',
        '1000万円以上',
        'その他',
    ]
    insert_data(AnnualIncome, annual_income_list)
