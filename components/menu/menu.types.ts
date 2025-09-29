export type SlMenuNode = SlMenuItemNode | SlSubMenuNode | SlDividerNode;

export type SlMenuNodeType = 'item' | 'sub' | 'divider';

export type SlMenuModeType = 'vertical' | 'horizontal' | 'inline';

export type SlMenuThemeType = 'light' | 'dark';

export interface SlBaseNode {
  type: SlMenuNodeType;
  /** 唯一键值（divider 可不填） */
  key?: string;
  /** 图标名 */
  icon?: string;
  /** 额外 class，用于个性化样式 */
  className?: string;
  /** 禁用 */
  disabled?: boolean;
  /** 可附带路由（用于 item） */
  route?: string | any[];

  level?: number;
}

// 菜单项
export interface SlMenuItemNode extends SlBaseNode {
  type: 'item';
  label: string;
}

// 子菜单
export interface SlSubMenuNode extends SlBaseNode {
  type: 'sub';
  label: string;
  /** 子节点 */
  children: SlMenuNode[];
  /** 是否默认展开（仅初始） */
  defaultOpen?: boolean;
}

// 分割线
export interface SlDividerNode {
  type: 'divider';
  className?: string;
}
