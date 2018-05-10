export default {
   increment(state) {
     state.count++
   },
   decrease(state) {
     state.count--
   },
   addFoodToCar(state, data) {
    let ifPush = true;
    state.selectedFoods.forEach((selectSingleFood, index) => {
      if (selectSingleFood.name === data.name) {
         state.selectedFoods.splice(index, 1, selectSingleFood)
         ifPush = false
     }
    })
    if (ifPush) {
      state.selectedFoods.push(data)
    }
    console.log(state.selectedFoods)
   },
   deFoodFromCar(state, oFood) {
    state.selectedFoods.forEach((selectSingleFood, index) => {
      if (selectSingleFood.name === oFood.name) {
        selectSingleFood.count--
        if (!selectSingleFood.count) {
          state.selectedFoods.splice(index, 1)
        }
      }
    })
    console.log(state.selectedFoods)
   }
}
