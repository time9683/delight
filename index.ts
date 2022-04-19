let x = 1





function add() {

    x = x + 1



}
add.bind(this)
add()
console.log(x)