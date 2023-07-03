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
  const levelOrder = function(fn = () => null){
    if (fn() === null){
    let node = root;
    let arr = [];
    let queque = [node];
    while(queque.length > 0){
      node = queque[0];
      arr.push(node.data);
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
  else{
    let node = root;
    let queque = [node];
    while(queque.length > 0){
      fn(queque[0]);
      node = queque[0];
      if (node.left != null){
        queque.push(node.left);
      }
      if (node.right != null){
        queque.push(node.right);
      }
      queque.shift();
    }
  }
    // recursive version
    /*
    let node = root;
    let arr = [];
    let queque = [node];
    function traverse(node){
      if (queque.length < 1){
        return;
      }
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
      traverse(queque[0]);
    }
    traverse(node);

    
    return arr;*/
  }

  const preorder = function(fn = () => null){
    //DLR
    // 1. Access Data from root
    // 2. Visit left subtree
    // 3. Visit right subtree
    if(fn() === null){
    let arr = [];

    function traverse(node){
      if(node == null){ return; }
      arr.push(node.data);
      traverse(node.left);
      traverse(node.right);
    }
    traverse(root);
    return arr;
    }
    else{
      function traverse(node){
      if(node == null){ return; }
      fn(node);
      traverse(node.left);
      traverse(node.right);
    }
    traverse(root);
    }

  }
  const inorder = function(fn = (x) => null){
    // LDR
    // 1. Visit left subtree
    // 2. Access Data from root
    // 3. Visit right subtree
    if(fn() === null){
    let arr = [];

    function traverse(node){
      if(node == null){ return; }
      traverse(node.left);
      arr.push(node.data);
      traverse(node.right);
    }
    traverse(root);
    return arr;
    }

    else{
      function traverse(node){
      if(node == null){ return; }
      traverse(node.left);
      fn(node);
      traverse(node.right);
      }
    traverse(root);
    }

  }
  const postorder = function(fn = () => null){
    //LRD
    // 1. Visit left subtree
    // 2. Visit right subtree
    // 3. Access Data from root
    if(fn() === null){
    let arr = [];

    function traverse(node){
      if(node == null){ return; }
      traverse(node.left);
      traverse(node.right);
      arr.push(node.data);
    }
    traverse(root);
    return arr;
    }
    else{
      function traverse(node){
      if(node == null){ return; }
      traverse(node.left);
      traverse(node.right);
      fn(node);
    }
    traverse(root);
    }
  }
  const height = function(node = this.root){ // function which accepts a node and returns its height. Height is defined as 
                                 //the number of edges in longest path from a given node to a leaf node.
    if (node == null){
      return -1;
    }
    let left = height(node.left) + 1;
    let right = height(node.right) + 1;
    if (left > right){
      return left;
    }
    else if (left < right){
      return right;
    }
    else{
      return left;
    }
  }
// fix this
  const depth = function(node){
    let comparisonNode = root; 
    let depth = 0;
    while(comparisonNode.data != node.data){
      if (comparisonNode.data < node.data){
        comparisonNode =  comparisonNode.right;
        depth++;
      }
      else if(comparisonNode.data > node.data){
        comparisonNode =  comparisonNode.left;
        depth++;
      }
    }
    return depth;
  }
  const isBalanced = function(){  

  }
  const rebalance = function(){

  }

  let sortedArr = mergeSort(eraseDuplicates(arr));
  console.log(sortedArr);
  let root = buildTree(sortedArr, 0, sortedArr.length - 1);


  return{printRoot, get root(){
    return root;
  }, insert, remove, find, levelOrder,
    preorder, inorder, postorder, height,
    depth, isBalanced};
}


const nodefactory = function(){
  let data = null;
  let left = null;
  let right = null;
  return{data, left, right};
}

let bSTree = tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
//bSTree.insert(323);
bSTree.printRoot();
bSTree.remove(8);
//bSTree.printRoot();
//console.log(bSTree.find(324));
console.log(bSTree.levelOrder());
console.log(bSTree.preorder());
console.log(bSTree.inorder());
console.log(bSTree.postorder());
console.log('height:', bSTree.height(bSTree.root));
console.log('depth:', bSTree.depth(bSTree.root.right));
bSTree.insert(8000);
bSTree.insert(9000);
bSTree.printRoot();
console.log(bSTree.levelOrder());
console.log('height:', bSTree.height(bSTree.root.left));
console.log('depth:', bSTree.depth(bSTree.root.right.right.right.right));