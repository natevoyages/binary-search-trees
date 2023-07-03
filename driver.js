const tree = require('./bst.js');
function randArr(){
    let arr  =[];
    let size = Math.floor(Math.random() * 8 + 13);
    while (size > arr.length){
      arr.push(Math.floor(Math.random() * 99));
    }
    return arr;
  }
  function randArrOverHund(){
    let arr  =[];
    let size = Math.floor(Math.random() * 6 + 4);
    while (size > arr.length){
      arr.push(Math.floor(Math.random() * 99 + 101));
    }
    return arr;
  }
  
  let bSTree = tree(randArr());
  console.log('Is Balanced:', bSTree.isBalanced());
  console.log('LevelOrder', bSTree.levelOrder());
  console.log('Preorder', bSTree.preorder());
  console.log('Inorder',bSTree.inorder());
  console.log('Postorder',bSTree.postorder());
  
  let biggerArr = randArrOverHund();
  
  biggerArr.forEach((element)=> bSTree.insert(element));
  console.log("Is Balanced:", bSTree.isBalanced());
  
  bSTree.rebalance();
  console.log('Is Balanced:', bSTree.isBalanced());
  console.log('LevelOrder', bSTree.levelOrder());
  console.log('Preorder', bSTree.preorder());
  console.log('Inorder',bSTree.inorder());
  console.log('Postorder',bSTree.postorder());