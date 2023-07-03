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

  const remove = function(val){
    let parent = null;
    let isLeft = false;
    let node = root;

    while(node.data != val){
      parent = node;
      if (node.data > val){
      node = node.left;
      isLeft = true;
     }
      else if (node.data < val){
      node = node.right;
      isLeft = false;
     }
    }
    // leaf case
    if (node.left == null && node.right == null && parent != null){
      if(isLeft){
        parent.left = null;
      }
      else{
        parent.right = null;
      }
    }
    // one child case
    else if((node.left == null && node.right != null && parent != null) ||
    (node.left != null && node.right == null && parent != null)){
      if(node.left == null){
        if(isLeft){
          parent.left = node.right;
        }
        else{
          parent.right = node.right;
        }
      }
      else{
        if(isLeft){
          parent.left = node.left;
        }
        else{
          parent.right = node.left;
        }
      }
    }
    // two child case
    else if(node.left != null && node.right != null && parent != null){
      let nodeInsertR = node.right;
      let nodeInsertL = node.left;
      let prev = null;
      if(isLeft){
        node = node.left;
        while(node.right != null){
          prev = node;
          node = node.right;
        }
        prev.right = null;
        node.right = nodeInsertR;
        node.left = nodeInsertL;
        parent.left = node;
      }
      else{
        node = node.left;
        while(node.right != null){
          prev = node;
          node = node.right;
        }
        prev.right =  null;
        node.right = nodeInsertR;
        node.left = nodeInsertL;
        parent.right = node;

      }
      
    }
    else if(node.left != null && node.right != null && parent == null){
      let nodeInsertR = node.right;
      let nodeInsertL = node.left;
      let prev = null;
        node = node.left;
        while(node.right != null){
          prev = node;
          node = node.right;
        }
        prev.right = null;
        node.right = nodeInsertR;
        node.left = nodeInsertL;
        root = node;
      }
  }

  const find = function(value){
    let node = root; 
    while(node.data != value){
      if (node.data < value){
        node =  node.right;
      }
      else if(node.data > value){
        node =  node.left;
      }
    }
    return node;
  }
  const levelOrder = function(fn = (data) => data){
    let node = root;
    let arr = [];
    let queque = [node];
    while(queque.length > 0){
      let newVal = fn(queque[0].data);
      node = queque[0];
      arr.push(newVal);
      if (node.left != null){
        queque.push(node.left);
      }
      if (node.right != null){
        queque.push(node.right);
      }
      queque.shift();
    }
    
    return arr;
  }

  let sortedArr = mergeSort(eraseDuplicates(arr));
  console.log(sortedArr);
  let root = buildTree(sortedArr, 0, sortedArr.length - 1);


  return{printRoot, get root(){
    return root;
  }, insert, remove, find, levelOrder};
}


const nodefactory = function(){
  let data = null;
  let left = null;
  let right = null;
  return{data, left, right};
}

let bSTree = tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
bSTree.insert(323);
bSTree.printRoot();
bSTree.remove(8);
bSTree.printRoot();
console.log(bSTree.find(324));
console.log(bSTree.levelOrder());

