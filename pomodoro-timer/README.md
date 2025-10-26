# 🍅 ポモドーロタイマー

Next.js + TypeScript + Tailwind CSS + **Biome** で作ったシンプルなポモドーロタイマーアプリ

## 🎯 このプロジェクトについて

このプロジェクトは **Biomeの理解を深めるための練習用アプリ** として作成しました。

### 機能
- ⏱️ 25分作業 + 5分休憩のタイマー
- 🎨 美しいプログレスバー表示
- ✅ 作業セッション数のカウント
- 🔔 タイマー終了時の通知音（予定）
- 📱 レスポンシブデザイン

## 🚀 セットアップ
```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ブラウザで http://localhost:3000 を開く
```

## 🔧 Biomeコマンド
```bash
# Lint + Format チェック（修正なし）
npm run lint

# Lint + Format チェック & 自動修正
npm run lint -- --write

# Formatのみ実行
npm run format
```

## 📚 Biomeについて学んだこと

### Biomeとは？
**Biome**は、LintとFormatを統合した高速なツールチェーンです。ESLint + Prettierの代替として使えます。

### 主な特徴
1. **高速** - Rustで書かれており、ESLint/Prettierより圧倒的に速い
2. **統合** - Lint・Format・Import整理が1つのツールで完結
3. **ゼロコンフィグ** - ベストプラクティスが最初から組み込まれている
4. **設定最小** - 必要最小限の設定で動作

### Biomeが自動でやってくれること

#### 1️⃣ Import文の並び替え
```typescript
// Before
import { useEffect, useState, useCallback } from "react";

// After (アルファベット順に自動ソート)
import { useCallback, useEffect, useState } from "react";
```

**仕組み:** biome.json の organizeImports: "on" で有効化されている

#### 2️⃣ コードフォーマット
```typescript
// Before (1行が長い)
<svg className="w-full h-64" viewBox="0 0 200 200" role="img" aria-label="ポモドーロタイマーの進捗">

// After (読みやすく複数行に)
<svg
  className="w-full h-64"
  viewBox="0 0 200 200"
  role="img"
  aria-label="ポモドーロタイマーの進捗"
>
```

**仕組み:** formatter.lineWidth の設定に基づいて自動整形

#### 3️⃣ React Hooksの依存関係チェック
```typescript
// Biomeが検出するエラー
useEffect(() => {
  playNotificationSound(); // この関数が依存配列に入っていない！
}, [isActive, minutes, seconds, mode]); // ここに追加すべき

// 修正案を提示してくれる
}, [isActive, minutes, seconds, mode, playNotificationSound]);
```

#### 4️⃣ アクセシビリティチェック
```typescript
// エラー: SVGにtitleやaria-labelがない
<svg className="w-full h-64" viewBox="0 0 200 200">

// 修正: アクセシビリティ属性を追加
<svg className="w-full h-64" viewBox="0 0 200 200" role="img" aria-label="説明">
  <title>タイトル</title>
```

### Biomeの設定ファイル (biome.json)
```json
{
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    },
    "domains": {
      "next": "recommended",
      "react": "recommended"
    }
  },
  "assist": {
    "actions": {
      "source": {
        "organizeImports": "on"
      }
    }
  }
}
```

### ベストプラクティス vs カスタマイズ

**Q: Biomeはどうやってルールを決めているの？**

A: Biomeは **ベストプラクティスを組み込んだルール** を持っています。

- **Import並び替え**: デフォルトでアルファベット順
- **フォーマット**: 読みやすさのため、長い行は自動で複数行に分割
- **Lint**: React、TypeScript、アクセシビリティのベストプラクティスを適用

**カスタマイズも可能:**
```json
{
  "formatter": {
    "lineWidth": 100,
    "indentWidth": 4
  },
  "linter": {
    "rules": {
      "suspicious": {
        "noUnknownAtRules": "off"
      }
    }
  }
}
```

### 他のツールとの比較

| ツール | 役割 | 速度 | カスタマイズ性 |
|--------|------|------|----------------|
| **Biome** | Lint + Format | 超高速 | 中程度 |
| **ESLint** | Lintのみ | 遅い | 高い |
| **Prettier** | Formatのみ | 普通 | 低い |

**Biomeの哲学:**
> 「ベストプラクティスを最初から組み込み、設定は最小限に」

## 🎓 このプロジェクトで学べること

- ✅ Next.js 16 + App Routerの基本
- ✅ React Hooksの使い方 (useState, useEffect, useCallback)
- ✅ Tailwind CSSでのスタイリング
- ✅ SVGアニメーション
- ✅ **Biomeを使ったコード品質管理**

## 📦 技術スタック

- **Next.js 16** - React フレームワーク
- **TypeScript** - 型安全性
- **Tailwind CSS** - ユーティリティファーストCSS
- **Biome** - Lint + Format ツール

## 🔗 参考リンク

- [Biome公式ドキュメント](https://biomejs.dev/)
- [Next.js公式ドキュメント](https://nextjs.org/docs)
- [ポモドーロ・テクニック](https://ja.wikipedia.org/wiki/%E3%83%9D%E3%83%A2%E3%83%89%E3%83%BC%E3%83%AD%E3%83%BB%E3%83%86%E3%82%AF%E3%83%8B%E3%83%83%E3%82%AF)

## 📝 ライセンス

MIT
