import { HttpModule, HttpService } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { AxiosResponse } from 'axios'
import { of } from 'rxjs/internal/observable/of'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { TagsItemRepository } from '@/public/tags-item/domain/tagsItem.repository'
import { TagsItemRepositoryImpl } from '@/public/tags-item/infrastructure/tagsItem.repositoryImpl'
import { ItemsData } from '@/types/itemsData'

const httpServiceMockData = [
  {
    rendered_body:
      '\u003cp\u003e株式会社オズビジョンの \u003ca href="/terra_yucco" class="user-mention js-hovercard" title="terra_yucco" data-hovercard-target-type="user" data-hovercard-target-name="terra_yucco"\u003e@terra_yucco\u003c/a\u003e です。\u003cbr\u003e\n2020/01 現在、オズビジョン 6 年目。内部ではちらほら配置換えもありつつも、なんだかんだでこの 6 年の大半はメインプロダクト「ハピタス」を見ています。\u003c/p\u003e\n\n\u003ch1\u003e\n\u003cspan id="前置き" class="fragment"\u003e\u003c/span\u003e\u003ca href="#%E5%89%8D%E7%BD%AE%E3%81%8D"\u003e\u003ci class="fa fa-link"\u003e\u003c/i\u003e\u003c/a\u003e前置き\u003c/h1\u003e\n\n\u003cp\u003e現在、品質向上のために仕様統括＋品質管理というロールを担っております。\u003cbr\u003e\n主な役割は、着手が決まった案件について、以下の項目のそれぞれについてレビューの必要性があるかを判断し、必要となったものはレビューをすること。もちろん担当チームは自分たちでも確認をしますが、仕様統括という形で全体のつながりも意識しながら追加で確認しています。\u003c/p\u003e\n\n\u003cul\u003e\n\u003cli\u003e要件定義\u003c/li\u003e\n\u003cli\u003eテスト設計\u003c/li\u003e\n\u003cli\u003eリリース・反映手順、動作確認手順\u003c/li\u003e\n\u003cli\u003e後日確認手順\u003c/li\u003e\n\u003cli\u003e切り戻し手順\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003cp\u003eansible のコードや、aws 関連のスクリプトの場合はコードを見たりもしますが、基本はプロダクトのコードは見ません。\u003c/p\u003e\n\n\u003ch1\u003e\n\u003cspan id="なぜこんなロールがあるのか" class="fragment"\u003e\u003c/span\u003e\u003ca href="#%E3%81%AA%E3%81%9C%E3%81%93%E3%82%93%E3%81%AA%E3%83%AD%E3%83%BC%E3%83%AB%E3%81%8C%E3%81%82%E3%82%8B%E3%81%AE%E3%81%8B"\u003e\u003ci class="fa fa-link"\u003e\u003c/i\u003e\u003c/a\u003eなぜこんなロールがあるのか\u003c/h1\u003e\n\n\u003cp\u003e一時期、リリース前後に不具合が頻発することがあったため。また、検出した不具合は、単純なテスト忘れや確認漏れが多く、誰かがチェックしていれば防げたんじゃないかと思われるようなものも多かったため。\u003c/p\u003e\n\n\u003ch1\u003e\n\u003cspan id="どんな点に気を付けて見ているのか" class="fragment"\u003e\u003c/span\u003e\u003ca href="#%E3%81%A9%E3%82%93%E3%81%AA%E7%82%B9%E3%81%AB%E6%B0%97%E3%82%92%E4%BB%98%E3%81%91%E3%81%A6%E8%A6%8B%E3%81%A6%E3%81%84%E3%82%8B%E3%81%AE%E3%81%8B"\u003e\u003ci class="fa fa-link"\u003e\u003c/i\u003e\u003c/a\u003eどんな点に気を付けて見ているのか\u003c/h1\u003e\n\n\u003ch2\u003e\n\u003cspan id="仕様統括として" class="fragment"\u003e\u003c/span\u003e\u003ca href="#%E4%BB%95%E6%A7%98%E7%B5%B1%E6%8B%AC%E3%81%A8%E3%81%97%E3%81%A6"\u003e\u003ci class="fa fa-link"\u003e\u003c/i\u003e\u003c/a\u003e仕様統括として\u003c/h2\u003e\n\n\u003ch3\u003e\n\u003cspan id="要件定義" class="fragment"\u003e\u003c/span\u003e\u003ca href="#%E8%A6%81%E4%BB%B6%E5%AE%9A%E7%BE%A9"\u003e\u003ci class="fa fa-link"\u003e\u003c/i\u003e\u003c/a\u003e要件定義\u003c/h3\u003e\n\n\u003cul\u003e\n\u003cli\u003eこれまでの機能との相反・不整合がないか\n\n\u003cul\u003e\n\u003cli\u003eユーザステータスの遷移\u003c/li\u003e\n\u003cli\u003e既存データとのドメインチェック\u003c/li\u003e\n\u003c/ul\u003e\n\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003ch3\u003e\n\u003cspan id="テスト設計" class="fragment"\u003e\u003c/span\u003e\u003ca href="#%E3%83%86%E3%82%B9%E3%83%88%E8%A8%AD%E8%A8%88"\u003e\u003ci class="fa fa-link"\u003e\u003c/i\u003e\u003c/a\u003eテスト設計\u003c/h3\u003e\n\n\u003cul\u003e\n\u003cli\u003e動作テストにおいて、提供機能のハッピーパスがテストされているか\u003c/li\u003e\n\u003cli\u003e機能的に見落としている、重要な組み合わせパターンはないか\u003c/li\u003e\n\u003cli\u003e事業的に意味を持つ、入力値のバリエーションはないか、ある場合はテストパターンに含まれているか\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003ch3\u003e\n\u003cspan id="リリース反映手順動作確認手順" class="fragment"\u003e\u003c/span\u003e\u003ca href="#%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9%E5%8F%8D%E6%98%A0%E6%89%8B%E9%A0%86%E5%8B%95%E4%BD%9C%E7%A2%BA%E8%AA%8D%E6%89%8B%E9%A0%86"\u003e\u003ci class="fa fa-link"\u003e\u003c/i\u003e\u003c/a\u003eリリース・反映手順、動作確認手順\u003c/h3\u003e\n\n\u003cul\u003e\n\u003cli\u003e複数機能をリリースする場合、前後関係は正しく保たれているか\u003c/li\u003e\n\u003cli\u003e機能にダウンタイムが発生する場合、調整はされているか、メンテナンスが必要な場合は調整済か\u003c/li\u003e\n\u003cli\u003e動作確認手順は、実際にリリースする変更部分の動作を確認できるものとなっているか\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003ch3\u003e\n\u003cspan id="全般" class="fragment"\u003e\u003c/span\u003e\u003ca href="#%E5%85%A8%E8%88%AC"\u003e\u003ci class="fa fa-link"\u003e\u003c/i\u003e\u003c/a\u003e全般\u003c/h3\u003e\n\n\u003cul\u003e\n\u003cli\u003e過去に出た不具合と類似の事象が発生しそうな場所はないか\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003ch2\u003e\n\u003cspan id="品質管理として" class="fragment"\u003e\u003c/span\u003e\u003ca href="#%E5%93%81%E8%B3%AA%E7%AE%A1%E7%90%86%E3%81%A8%E3%81%97%E3%81%A6"\u003e\u003ci class="fa fa-link"\u003e\u003c/i\u003e\u003c/a\u003e品質管理として\u003c/h2\u003e\n\n\u003cp\u003e若手のメンバーも多いので、かなり一般的な見方をしています。これは主にテスト設計の確認に適用しています。\u003cbr\u003e\n本来は DB 設計やセキュリティ観点なども要件定義で見たほうが良いのですが、これは現状では各チームに移管しています。\u003c/p\u003e\n\n\u003ch3\u003e\n\u003cspan id="基本" class="fragment"\u003e\u003c/span\u003e\u003ca href="#%E5%9F%BA%E6%9C%AC"\u003e\u003ci class="fa fa-link"\u003e\u003c/i\u003e\u003c/a\u003e基本\u003c/h3\u003e\n\n\u003cul\u003e\n\u003cli\u003e誰が見ても実施する内容がわかるテスト設計となっているか\u003c/li\u003e\n\u003cli\u003e期待するインプットが明確か、全て洗い出されているか\u003c/li\u003e\n\u003cli\u003e期待する想定の結果が明示されているか　※「正常であること」などは想定結果ではない\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003ch3\u003e\n\u003cspan id="単体観点" class="fragment"\u003e\u003c/span\u003e\u003ca href="#%E5%8D%98%E4%BD%93%E8%A6%B3%E7%82%B9"\u003e\u003ci class="fa fa-link"\u003e\u003c/i\u003e\u003c/a\u003e単体観点\u003c/h3\u003e\n\n\u003cul\u003e\n\u003cli\u003e各ドメインの値、境界値\u003c/li\u003e\n\u003cli\u003eカバレッジ\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003ch3\u003e\n\u003cspan id="結合観点" class="fragment"\u003e\u003c/span\u003e\u003ca href="#%E7%B5%90%E5%90%88%E8%A6%B3%E7%82%B9"\u003e\u003ci class="fa fa-link"\u003e\u003c/i\u003e\u003c/a\u003e結合観点\u003c/h3\u003e\n\n\u003cul\u003e\n\u003cli\u003e状態遷移を伴う場合には、実際に遷移させるテストを行う設計になっているか\u003c/li\u003e\n\u003cli\u003e既存の機能に影響する場合、その機能全体の通しのテストも行う設計になっているか\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003ch3\u003e\n\u003cspan id="全体" class="fragment"\u003e\u003c/span\u003e\u003ca href="#%E5%85%A8%E4%BD%93"\u003e\u003ci class="fa fa-link"\u003e\u003c/i\u003e\u003c/a\u003e全体\u003c/h3\u003e\n\n\u003cul\u003e\n\u003cli\u003e必要なテストが、コードレベルの UT などとマニュアルテストを合わせて網羅されているか\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003ch1\u003e\n\u003cspan id="効果" class="fragment"\u003e\u003c/span\u003e\u003ca href="#%E5%8A%B9%E6%9E%9C"\u003e\u003ci class="fa fa-link"\u003e\u003c/i\u003e\u003c/a\u003e効果\u003c/h1\u003e\n\n\u003cp\u003e普段の業務にプラスオンして何名かのメンバーで分担していますが、レビューを間に挟んで別の人の目を入れたということはいい方に働いており、このレビューをしっかりやった案件ほど不具合が出ないという結果にはなっています。\u003cbr\u003e\nただし当たり前ながら QCD の CD を少し犠牲にして Q を上げている結果にはなっているので、次はここに何らかの手を打っていきたいと考えています。\u003c/p\u003e\n\n\u003ch1\u003e\n\u003cspan id="これから" class="fragment"\u003e\u003c/span\u003e\u003ca href="#%E3%81%93%E3%82%8C%E3%81%8B%E3%82%89"\u003e\u003ci class="fa fa-link"\u003e\u003c/i\u003e\u003c/a\u003eこれから\u003c/h1\u003e\n\n\u003cp\u003e既に一回実施していますが、このレビューを通して得られた知見を社内にシェアし、将来的には特別なレビューを挟まなくても各チームで品質向上に取り組んでいければと考えています。\u003cbr\u003e\n皆さんのレビュー観点などももしあればぜひ教えてください。\u003c/p\u003e\n',
    body: '株式会社オズビジョンの @terra_yucco です。\n2020/01 現在、オズビジョン 6 年目。内部ではちらほら配置換えもありつつも、なんだかんだでこの 6 年の大半はメインプロダクト「ハピタス」を見ています。\n\n# 前置き\n現在、品質向上のために仕様統括＋品質管理というロールを担っております。\n主な役割は、着手が決まった案件について、以下の項目のそれぞれについてレビューの必要性があるかを判断し、必要となったものはレビューをすること。もちろん担当チームは自分たちでも確認をしますが、仕様統括という形で全体のつながりも意識しながら追加で確認しています。\n\n- 要件定義\n- テスト設計\n- リリース・反映手順、動作確認手順\n- 後日確認手順\n- 切り戻し手順\n\nansible のコードや、aws 関連のスクリプトの場合はコードを見たりもしますが、基本はプロダクトのコードは見ません。\n\n# なぜこんなロールがあるのか\n一時期、リリース前後に不具合が頻発することがあったため。また、検出した不具合は、単純なテスト忘れや確認漏れが多く、誰かがチェックしていれば防げたんじゃないかと思われるようなものも多かったため。\n\n# どんな点に気を付けて見ているのか\n## 仕様統括として\n### 要件定義\n\n- これまでの機能との相反・不整合がないか\n    - ユーザステータスの遷移\n    - 既存データとのドメインチェック\n\n### テスト設計\n\n- 動作テストにおいて、提供機能のハッピーパスがテストされているか\n- 機能的に見落としている、重要な組み合わせパターンはないか\n- 事業的に意味を持つ、入力値のバリエーションはないか、ある場合はテストパターンに含まれているか\n\n### リリース・反映手順、動作確認手順\n\n- 複数機能をリリースする場合、前後関係は正しく保たれているか\n- 機能にダウンタイムが発生する場合、調整はされているか、メンテナンスが必要な場合は調整済か\n- 動作確認手順は、実際にリリースする変更部分の動作を確認できるものとなっているか\n\n### 全般\n\n- 過去に出た不具合と類似の事象が発生しそうな場所はないか\n\n## 品質管理として\n\n若手のメンバーも多いので、かなり一般的な見方をしています。これは主にテスト設計の確認に適用しています。\n本来は DB 設計やセキュリティ観点なども要件定義で見たほうが良いのですが、これは現状では各チームに移管しています。\n\n### 基本\n\n- 誰が見ても実施する内容がわかるテスト設計となっているか\n- 期待するインプットが明確か、全て洗い出されているか\n- 期待する想定の結果が明示されているか　※「正常であること」などは想定結果ではない\n\n### 単体観点\n\n- 各ドメインの値、境界値\n- カバレッジ\n\n### 結合観点\n\n- 状態遷移を伴う場合には、実際に遷移させるテストを行う設計になっているか\n- 既存の機能に影響する場合、その機能全体の通しのテストも行う設計になっているか\n\n### 全体\n\n- 必要なテストが、コードレベルの UT などとマニュアルテストを合わせて網羅されているか\n\n# 効果\n\n普段の業務にプラスオンして何名かのメンバーで分担していますが、レビューを間に挟んで別の人の目を入れたということはいい方に働いており、このレビューをしっかりやった案件ほど不具合が出ないという結果にはなっています。\nただし当たり前ながら QCD の CD を少し犠牲にして Q を上げている結果にはなっているので、次はここに何らかの手を打っていきたいと考えています。\n\n# これから\n\n既に一回実施していますが、このレビューを通して得られた知見を社内にシェアし、将来的には特別なレビューを挟まなくても各チームで品質向上に取り組んでいければと考えています。\n皆さんのレビュー観点などももしあればぜひ教えてください。\n',
    coediting: false,
    comments_count: 0,
    created_at: '2020-01-31T23:59:59+09:00',
    group: {
      created_at: '2000-01-01T00:00:00+00:00',
      description: 'This group is for developers.',
      name: 'Dev',
      private: false,
      updated_at: '2000-01-01T00:00:00+00:00',
      url_name: 'dev',
    },
    id: 'dbd83151ce9d74b016e8',
    likes_count: 2,
    private: false,
    reactions_count: 0,
    stocks_count: 3,
    tags: [
      {
        name: '仕様',
        versions: [],
      },
      {
        name: '品質管理',
        versions: [],
      },
      {
        name: '品質',
        versions: [],
      },
      {
        name: 'QCD',
        versions: [],
      },
      {
        name: 'wifi',
        versions: [],
      },
    ],
    title: '品質担保に本気で取り組んでみている話',
    updated_at: '2020-01-31T23:59:59+09:00',
    url: 'https://qiita.com/terra_yucco/items/dbd83151ce9d74b016e8',
    user: {
      description:
        '株式会社オズビジョンでサーバサイドエンジニアとして勤務しているユッコ (テラシマユウコ) です。IPA の情報処理技術者試験で資格を取りまくっていた時期があり FE/AP/SA/DB/ES/SC(旧区分時代:情報セキュリティスペシャリスト) を取得済。',
      facebook_id: '',
      followees_count: 14,
      followers_count: 44,
      github_login_name: 'terra-yucco',
      id: 'terra_yucco',
      items_count: 97,
      linkedin_id: '',
      location: 'Tokyo, Japan',
      name: 'Yuko Terashima',
      organization: 'OZvision Inc.',
      permanent_id: 95030,
      profile_image_url:
        'https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/95030/profile-images/1575334595',
      team_only: false,
      twitter_screen_name: 'terra_yucco',
      website_url: '',
    },
    page_views_count: 0,
    team_membership: null,
    organization_url_name: 'ozvision',
    slide: false,
  },
  {
    rendered_body:
      '\n\u003ch1\u003e\n\u003cspan id="unityで取得できる-screensafeareaには罠がある" class="fragment"\u003e\u003c/span\u003e\u003ca href="#unity%E3%81%A7%E5%8F%96%E5%BE%97%E3%81%A7%E3%81%8D%E3%82%8B-screensafearea%E3%81%AB%E3%81%AF%E7%BD%A0%E3%81%8C%E3%81%82%E3%82%8B"\u003e\u003ci class="fa fa-link"\u003e\u003c/i\u003e\u003c/a\u003eUnityで取得できる Screen.safeAreaには罠（？）がある\u003c/h1\u003e\n\n\u003cp\u003e罠に遭遇したのは、以下の条件\u003c/p\u003e\n\n\u003cul\u003e\n\u003cli\u003e4.7インチiPhone(iPhone6/7など)\u003c/li\u003e\n\u003cli\u003eUnity2017.4.35, 2018.4.15\u003c/li\u003e\n\u003cli\u003eiOS10\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003ctable\u003e\n\u003cthead\u003e\n\u003ctr\u003e\n\u003cth\u003eOS\u003c/th\u003e\n\u003cth\u003eScreen.safeArea.h\u003c/th\u003e\n\u003cth\u003eScreen.height\u003c/th\u003e\n\u003cth\u003eステータスバー高さ\u003c/th\u003e\n\u003c/tr\u003e\n\u003c/thead\u003e\n\u003ctbody\u003e\n\u003ctr\u003e\n\u003ctd\u003eiOS12\u003c/td\u003e\n\u003ctd\u003e1294\u003c/td\u003e\n\u003ctd\u003e1334\u003c/td\u003e\n\u003ctd\u003e40\u003c/td\u003e\n\u003c/tr\u003e\n\u003ctr\u003e\n\u003ctd\u003eiOS10\u003c/td\u003e\n\u003ctd\u003e1334\u003c/td\u003e\n\u003ctd\u003e1334\u003c/td\u003e\n\u003ctd\u003e40\u003c/td\u003e\n\u003c/tr\u003e\n\u003c/tbody\u003e\n\u003c/table\u003e\n\n\u003cul\u003e\n\u003cli\u003eiOS11以降だとsafeAreaのRectは正しくステータスバーを避けてくれるが、iOS10だと重なってしまう\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003ch1\u003e\n\u003cspan id="原因" class="fragment"\u003e\u003c/span\u003e\u003ca href="#%E5%8E%9F%E5%9B%A0"\u003e\u003ci class="fa fa-link"\u003e\u003c/i\u003e\u003c/a\u003e原因\u003c/h1\u003e\n\n\u003cul\u003e\n\u003cli\u003eそもそもsafeAreaの導入がiOS11から\u003c/li\u003e\n\u003cli\u003eScreen.safeAreaは単純にsafeAreaInsetsをOS判定して取得しているだけだと思われる\n\n\u003cul\u003e\n\u003cli\u003eiOS10以下はエラーにならないようにしているだけ?\u003c/li\u003e\n\u003c/ul\u003e\n\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003ch1\u003e\n\u003cspan id="解決策" class="fragment"\u003e\u003c/span\u003e\u003ca href="#%E8%A7%A3%E6%B1%BA%E7%AD%96"\u003e\u003ci class="fa fa-link"\u003e\u003c/i\u003e\u003c/a\u003e解決策\u003c/h1\u003e\n\n\u003cul\u003e\n\u003cli\u003eOSを取得して分岐するしかなさそう\n\n\u003cul\u003e\n\u003cli\u003eiOS10以下ならiPhoneX系統は存在しないから、ステータスバーは 20 x scale で固定…？\u003c/li\u003e\n\u003cli\u003escaleを取得するにも結局plugin書かないとなので、topLayoutGuide、bottomLayoutGuideあたりを使うのが良さそう\u003c/li\u003e\n\u003c/ul\u003e\n\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003ch1\u003e\n\u003cspan id="参考" class="fragment"\u003e\u003c/span\u003e\u003ca href="#%E5%8F%82%E8%80%83"\u003e\u003ci class="fa fa-link"\u003e\u003c/i\u003e\u003c/a\u003e参考\u003c/h1\u003e\n\n\u003cul\u003e\n\u003cli\u003e\u003ca href="https://qiita.com/risuke/items/bb5735f0e8f3bc8306db" id="reference-7817a45b0dc49d928008"\u003eiPhoneXでのAutoLayoutをきれいに書くための試行錯誤\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href="https://qiita.com/nkjzm/items/e395e6da9ca46963dba9" id="reference-184fdf4cb51771b58cf2"\u003e【Unity】これ以上iOSのSafeAreaで消耗したくない人のため『Unity-SafeAreaCanvas』\u003c/a\u003e\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003ch1\u003e\n\u003cspan id="余談" class="fragment"\u003e\u003c/span\u003e\u003ca href="#%E4%BD%99%E8%AB%87"\u003e\u003ci class="fa fa-link"\u003e\u003c/i\u003e\u003c/a\u003e余談\u003c/h1\u003e\n\n\u003cul\u003e\n\u003cli\u003eこの記事を検証するにあたってシミュレーターで実行しようとして色々色々罠にハマった…\u003c/li\u003e\n\u003cli\u003e警告に従って、Graphics APIsにGLES3を「追加」すると、シミュレーターでのアプリ起動時に \u003ccode\u003eUnityInitApplicationGraphics\u003c/code\u003e で停止してしまう\u003c/li\u003e\n\u003cli\u003e正解は、「追加」ではなく入れ替え（Metalは削除）\u003c/li\u003e\n\u003cli\u003eが、ES3に入れ替えたバージョンでiOS13の検証はできたが、iOS10のシミュレーターで実行しようとすると再び\u003ccode\u003eUnityInitApplicationGraphics\u003c/code\u003e で停止\u003c/li\u003e\n\u003cli\u003e未検証だが、ES2にするべきなのかもしれない\u003c/li\u003e\n\u003c/ul\u003e\n',
    body: '# Unityで取得できる Screen.safeAreaには罠（？）がある\n\n罠に遭遇したのは、以下の条件\n\n- 4.7インチiPhone(iPhone6/7など)\n- Unity2017.4.35, 2018.4.15\n- iOS10\n\n|OS|Screen.safeArea.h|Screen.height|ステータスバー高さ|\n|---|---|---|---|\n|iOS12|1294|1334|40|\n|iOS10|1334|1334|40|\n\n- iOS11以降だとsafeAreaのRectは正しくステータスバーを避けてくれるが、iOS10だと重なってしまう\n\n# 原因\n\n- そもそもsafeAreaの導入がiOS11から\n- Screen.safeAreaは単純にsafeAreaInsetsをOS判定して取得しているだけだと思われる\n    - iOS10以下はエラーにならないようにしているだけ?\n\n# 解決策\n\n- OSを取得して分岐するしかなさそう\n - iOS10以下ならiPhoneX系統は存在しないから、ステータスバーは 20 x scale で固定…？\n    - scaleを取得するにも結局plugin書かないとなので、topLayoutGuide、bottomLayoutGuideあたりを使うのが良さそう\n\n# 参考\n\n- [iPhoneXでのAutoLayoutをきれいに書くための試行錯誤](https://qiita.com/risuke/items/bb5735f0e8f3bc8306db)\n- [【Unity】これ以上iOSのSafeAreaで消耗したくない人のため『Unity-SafeAreaCanvas』](https://qiita.com/nkjzm/items/e395e6da9ca46963dba9)\n\n\n# 余談\n\n- この記事を検証するにあたってシミュレーターで実行しようとして色々色々罠にハマった…\n- 警告に従って、Graphics APIsにGLES3を「追加」すると、シミュレーターでのアプリ起動時に `UnityInitApplicationGraphics` で停止してしまう\n- 正解は、「追加」ではなく入れ替え（Metalは削除）\n- が、ES3に入れ替えたバージョンでiOS13の検証はできたが、iOS10のシミュレーターで実行しようとすると再び`UnityInitApplicationGraphics` で停止\n- 未検証だが、ES2にするべきなのかもしれない\n',
    coediting: false,
    comments_count: 0,
    created_at: '2020-01-31T23:56:36+09:00',
    group: {
      created_at: '2000-01-01T00:00:00+00:00',
      description: 'This group is for developers.',
      name: 'Dev',
      private: false,
      updated_at: '2000-01-01T00:00:00+00:00',
      url_name: 'dev',
    },
    id: '7244eb5869024651548a',
    likes_count: 5,
    private: false,
    reactions_count: 0,
    stocks_count: 4,
    tags: [
      {
        name: 'iOS',
        versions: [],
      },
      {
        name: 'Unity',
        versions: [],
      },
      {
        name: 'SafeArea',
        versions: [],
      },
      {
        name: 'wifi',
        versions: [],
      },
    ],
    title: '【Unity】Screen.safeAreaとiOSステータスバーの罠（？）',
    updated_at: '2020-02-02T15:38:48+09:00',
    url: 'https://qiita.com/yuiyoichi/items/7244eb5869024651548a',
    user: {
      description:
        '湘南藤沢在住、こんにちはマイコン世代のゲームプログラマです。',
      facebook_id: '',
      followees_count: 5,
      followers_count: 3,
      github_login_name: 'yuiyoichi',
      id: 'yuiyoichi',
      items_count: 8,
      linkedin_id: '',
      location: '神奈川県藤沢市',
      name: 'ゆい よういち',
      organization: '',
      permanent_id: 102758,
      profile_image_url:
        'https://qiita-image-store.s3.amazonaws.com/0/102758/profile-images/1473708796',
      team_only: false,
      twitter_screen_name: 'meross_k',
      website_url: 'https://tassle.hatenablog.com/',
    },
    page_views_count: 0,
    team_membership: null,
    organization_url_name: null,
    slide: false,
  },
]

const responseData: ItemsData[] = [
  {
    body: '株式会社オズビジョンの @terra_yucco です。\n2020/01 現在、オズビジョン 6 年目。内部ではちらほら配置換えもありつつも、なんだかんだでこの 6 年の大半はメインプロダクト「ハピタス」を見ています。\n\n# 前置き\n現在、品質向上のために仕様統括＋品質管理というロールを担っております。\n主な役割は、着手が決まった案件について、以下の項目のそれぞれについてレビューの必要性があるかを判断し、必要となったものはレビューをすること。もちろん担当チームは自分たちでも確認をしますが、仕様統括という形で全体のつながりも意識しながら追加で確認しています。\n\n- 要件定義\n- テスト設計\n- リリース・反映手順、動作確認手順\n- 後日確認手順\n- 切り戻し手順\n\nansible のコードや、aws 関連のスクリプトの場合はコードを見たりもしますが、基本はプロダクトのコードは見ません。\n\n# なぜこんなロールがあるのか\n一時期、リリース前後に不具合が頻発することがあったため。また、検出した不具合は、単純なテスト忘れや確認漏れが多く、誰かがチェックしていれば防げたんじゃないかと思われるようなものも多かったため。\n\n# どんな点に気を付けて見ているのか\n## 仕様統括として\n### 要件定義\n\n- これまでの機能との相反・不整合がないか\n    - ユーザステータスの遷移\n    - 既存データとのドメインチェック\n\n### テスト設計\n\n- 動作テストにおいて、提供機能のハッピーパスがテストされているか\n- 機能的に見落としている、重要な組み合わせパターンはないか\n- 事業的に意味を持つ、入力値のバリエーションはないか、ある場合はテストパターンに含まれているか\n\n### リリース・反映手順、動作確認手順\n\n- 複数機能をリリースする場合、前後関係は正しく保たれているか\n- 機能にダウンタイムが発生する場合、調整はされているか、メンテナンスが必要な場合は調整済か\n- 動作確認手順は、実際にリリースする変更部分の動作を確認できるものとなっているか\n\n### 全般\n\n- 過去に出た不具合と類似の事象が発生しそうな場所はないか\n\n## 品質管理として\n\n若手のメンバーも多いので、かなり一般的な見方をしています。これは主にテスト設計の確認に適用しています。\n本来は DB 設計やセキュリティ観点なども要件定義で見たほうが良いのですが、これは現状では各チームに移管しています。\n\n### 基本\n\n- 誰が見ても実施する内容がわかるテスト設計となっているか\n- 期待するインプットが明確か、全て洗い出されているか\n- 期待する想定の結果が明示されているか　※「正常であること」などは想定結果ではない\n\n### 単体観点\n\n- 各ドメインの値、境界値\n- カバレッジ\n\n### 結合観点\n\n- 状態遷移を伴う場合には、実際に遷移させるテストを行う設計になっているか\n- 既存の機能に影響する場合、その機能全体の通しのテストも行う設計になっているか\n\n### 全体\n\n- 必要なテストが、コードレベルの UT などとマニュアルテストを合わせて網羅されているか\n\n# 効果\n\n普段の業務にプラスオンして何名かのメンバーで分担していますが、レビューを間に挟んで別の人の目を入れたということはいい方に働いており、このレビューをしっかりやった案件ほど不具合が出ないという結果にはなっています。\nただし当たり前ながら QCD の CD を少し犠牲にして Q を上げている結果にはなっているので、次はここに何らかの手を打っていきたいと考えています。\n\n# これから\n\n既に一回実施していますが、このレビューを通して得られた知見を社内にシェアし、将来的には特別なレビューを挟まなくても各チームで品質向上に取り組んでいければと考えています。\n皆さんのレビュー観点などももしあればぜひ教えてください。\n',
    id: 'dbd83151ce9d74b016e8',
    likesCount: 2,
    private: false,
    reactionsCount: 0,
    stocksCount: 3,
    tags: ['仕様', '品質管理', '品質', 'QCD', 'wifi'],
    title: '品質担保に本気で取り組んでみている話',
    url: 'https://qiita.com/terra_yucco/items/dbd83151ce9d74b016e8',
    pageViewsCount: 0,
  },
  {
    body: '# Unityで取得できる Screen.safeAreaには罠（？）がある\n\n罠に遭遇したのは、以下の条件\n\n- 4.7インチiPhone(iPhone6/7など)\n- Unity2017.4.35, 2018.4.15\n- iOS10\n\n|OS|Screen.safeArea.h|Screen.height|ステータスバー高さ|\n|---|---|---|---|\n|iOS12|1294|1334|40|\n|iOS10|1334|1334|40|\n\n- iOS11以降だとsafeAreaのRectは正しくステータスバーを避けてくれるが、iOS10だと重なってしまう\n\n# 原因\n\n- そもそもsafeAreaの導入がiOS11から\n- Screen.safeAreaは単純にsafeAreaInsetsをOS判定して取得しているだけだと思われる\n    - iOS10以下はエラーにならないようにしているだけ?\n\n# 解決策\n\n- OSを取得して分岐するしかなさそう\n - iOS10以下ならiPhoneX系統は存在しないから、ステータスバーは 20 x scale で固定…？\n    - scaleを取得するにも結局plugin書かないとなので、topLayoutGuide、bottomLayoutGuideあたりを使うのが良さそう\n\n# 参考\n\n- [iPhoneXでのAutoLayoutをきれいに書くための試行錯誤](https://qiita.com/risuke/items/bb5735f0e8f3bc8306db)\n- [【Unity】これ以上iOSのSafeAreaで消耗したくない人のため『Unity-SafeAreaCanvas』](https://qiita.com/nkjzm/items/e395e6da9ca46963dba9)\n\n\n# 余談\n\n- この記事を検証するにあたってシミュレーターで実行しようとして色々色々罠にハマった…\n- 警告に従って、Graphics APIsにGLES3を「追加」すると、シミュレーターでのアプリ起動時に `UnityInitApplicationGraphics` で停止してしまう\n- 正解は、「追加」ではなく入れ替え（Metalは削除）\n- が、ES3に入れ替えたバージョンでiOS13の検証はできたが、iOS10のシミュレーターで実行しようとすると再び`UnityInitApplicationGraphics` で停止\n- 未検証だが、ES2にするべきなのかもしれない\n',
    id: '7244eb5869024651548a',
    likesCount: 5,
    private: false,
    reactionsCount: 0,
    stocksCount: 4,
    tags: ['iOS', 'Unity', 'SafeArea', 'wifi'],
    title: '【Unity】Screen.safeAreaとiOSステータスバーの罠（？）',
    url: 'https://qiita.com/yuiyoichi/items/7244eb5869024651548a',
    pageViewsCount: 0,
  },
]

describe('tagsItemRepository', () => {
  let repository: TagsItemRepository
  let httpService: HttpService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        { provide: TagsItemRepository, useClass: TagsItemRepositoryImpl },
      ],
    }).compile()
    repository = module.get<TagsItemRepository>(TagsItemRepository)
    httpService = module.get<HttpService>(HttpService)
  })

  test('should be defined', async () => {
    expect.hasAssertions()

    const requestData = 'wifi'
    vi.spyOn(httpService, 'get').mockImplementationOnce(() => {
      return of({
        data: httpServiceMockData,
      } as AxiosResponse)
    })
    const result = await repository.getItemsFromTag(requestData)

    expect(httpService.get).toHaveBeenCalledWith(
      `https://qiita.com/api/v2/items?per_page=100&query=tags:${requestData}`,
    )
    expect(result).toStrictEqual(responseData)
  })
})
