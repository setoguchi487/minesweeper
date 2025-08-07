//難易度設定
export const getBoardSettings = (level) => {
    switch (level){
      case 'easy':
        return {rows: 8, cols: 8, mines: 10};
      case 'medium':
        return {rows: 15, cols: 15, mines: 30};
      case 'hard':
        return {rows: 20, cols: 30, mines: 120};
      case 'very hard':
        return {rows: 25, cols: 50, mines: 240};
      default:
        return {rows: 10, cols: 10, mines: 10};
    }
};