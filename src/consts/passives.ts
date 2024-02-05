export type PassiveOption = {
  attack?: number;
  defense?: number;
  moveSpeed?: number;
  playerAttack?: number;
  playerDefense?: number;
  normalAttack?: number;
  waterAttack?: number;
  earthAttack?: number;
  grassAttack?: number;
  dragonAttack?: number;
  fireAttack?: number;
  iceAttack?: number;
  lightningAttack?: number;
  darkAttack?: number;
  normalDefense?: number;
  waterDefense?: number;
  earthDefense?: number;
  grassDefense?: number;
  dragonDefense?: number;
  fireDefense?: number;
  iceDefense?: number;
  lightningDefense?: number;
  darkDefense?: number;
  workSpeed?: number;
  sanEffect?: number;
  hungry?: number;
};

export type Passive = {
  name: string;
  option: PassiveOption;
};

export const passives: Passive[] = [
  { name: "용감", option: { attack: 1.1 } },
  { name: "사나움", option: { attack: 1.2 } },
  { name: "단단한 피부", option: { defense: 1.1 } },
  { name: "억센 육체", option: { defense: 1.2 } },
  { name: "재빠름", option: { moveSpeed: 1.1 } },
  { name: "달리기 왕", option: { moveSpeed: 1.2 } },
  { name: "신속", option: { moveSpeed: 1.3 } },
  { name: "희귀", option: { attack: 1.15, workSpeed: 1.15 } },
  { name: "전설", option: { attack: 1.2, workSpeed: 1.2, moveSpeed: 1.15 } },
  { name: "돌격 지휘자", option: { playerAttack: 1.1 } },
  { name: "철옹성의 책사", option: { playerDefense: 1.1 } },
  { name: "무의 경지", option: { normalAttack: 1.1 } },
  { name: "성천", option: { normalAttack: 1.2 } },
  { name: "물놀이 선호", option: { waterAttack: 1.1 } },
  { name: "해황", option: { waterAttack: 1.2 } },
  { name: "대지의 힘", option: { earthAttack: 1.1 } },
  { name: "지제", option: { earthAttack: 1.2 } },
  { name: "초목의 향기", option: { grassAttack: 1.1 } },
  { name: "정령왕", option: { grassAttack: 1.2 } },
  { name: "용의 혈족", option: { dragonAttack: 1.1 } },
  { name: "신룡", option: { dragonAttack: 1.2 } },
  { name: "불놀이 선호", option: { fireAttack: 1.1 } },
  { name: "염제", option: { fireAttack: 1.2 } },
  { name: "냉혈", option: { iceAttack: 1.1 } },
  { name: "빙제", option: { iceAttack: 1.2 } },
  { name: "콘덴서", option: { lightningAttack: 1.1 } },
  { name: "뇌제", option: { lightningAttack: 1.2 } },
  { name: "밤의 장막", option: { darkAttack: 1.1 } },
  { name: "명왕", option: { darkAttack: 1.2 } },
  { name: "어브노멀", option: { normalDefense: 1.1 } },
  { name: "방수 가공", option: { waterDefense: 1.1 } },
  { name: "내진 구조", option: { earthDefense: 1.1 } },
  { name: "방초 효과", option: { grassDefense: 1.1 } },
  { name: "용 학살자", option: { dragonDefense: 1.1 } },
  { name: "일광욕 선호", option: { fireDefense: 1.1 } },
  { name: "고온 체질", option: { iceDefense: 1.1 } },
  { name: "절연체", option: { lightningDefense: 1.1 } },
  { name: "밝은 성격", option: { darkDefense: 1.1 } },
  { name: "성실함", option: { workSpeed: 1.2 } },
  { name: "장인 기질", option: { workSpeed: 1.5 } },
  { name: "긍정적인 사고", option: { sanEffect: 1.1 } },
  { name: "일 중독", option: { sanEffect: 1.1 } },
  { name: "난폭함", option: { attack: 1.15, workSpeed: 0.9 } },
  { name: "운동 바보", option: { attack: 1.3, workSpeed: 0.5 } },
  { name: "자만심", option: { workSpeed: 1.1, defense: 0.9 } },
  { name: "일 노예", option: { workSpeed: 1.1, attack: 0.7 } },
  { name: "먹보", option: { hungry: 0.9 } },
  { name: "블랙홀 위장", option: { hungry: 1.1 } },
];
