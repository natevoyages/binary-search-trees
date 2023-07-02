const tree = function(arr) {
  const buildTree = function(arr, start = 0, end){
    let mid = Math.floor((start + end)/2);
    if (start > end){
      return null;
    }

    let rootNode = nodefactory();
    rootNode.data = arr[mid];
    rootNode.left = buildTree(arr, start, mid - 1);
    rootNode.right = buildTree(arr, mid + 1, end);

  return rootNode;
  }


  const prettyPrint = function(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
  const printRoot = function() {
    prettyPrint(root);
  }
  const mergeSort = function(arr){
    if (arr.length === 1){
      return arr;
    }
    let mid = Math.floor(arr.length/2);

    let left = mergeSort(arr.slice(0,mid));
    let right = mergeSort(arr.slice(mid));
    function merge(left, right){
      let merged = [];
      let i = 0;
      let j = 0;
      while(i < left.length && j < right.length){
        if (left[i] < right[j]){
          merged.push(left[i++]);
        }
        else{
          merged.push(right[j++]);
        }
      }
      while(i < left.length){
        merged.push(left[i++]);
      }
      while(j < right.length){
        merged.push(right[j++]);
      }
      return merged;
    }

    return merge(left, right);
  }
  const eraseDuplicates = function(arr){
    let i = 0;
    while (i < arr.length - 1){
      for(let j = i + 1; j < arr.length; j++){
        if(arr[i] == arr[j]){
          arr.splice(j, 1);
        }
      }
      i++;
    }
    return arr;
  }
  const insert = function(value) {
    let node = root;
    let prevNode = null;
    let isLeft = false;
    while(node != null)
    if (value > node.data){
      prevNode = node;
      node = node.right;
      isLeft = false;
    }
    else{
      prevNode = node;
      node = node.left;
      isLeft = true;
    }
    if(isLeft){
      node = nodefactory();
      node.data = value;
      prevNode.left = node;
    }
    else{
      node = nodefactory();
      node.data = value;
      prevNode.right = node;
    }

  }

  const remove = function(value){

  }

  let sortedArr = mergeSort(eraseDuplicates(arr));
  console.log(sortedArr);
  let root = buildTree(sortedArr, 0, sortedArr.length - 1);


  return{printRoot, get root(){
    return root;
  }, insert};
}


const nodefactory = function(){
  let data = null;
  let left = null;
  let right = null;
  return{data, left, right};
}

let bSTree = tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

bSTree.printRoot();
bSTree.insert(60);
bSTree.printRoot();
console.log(bSTree.root);