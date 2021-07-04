const getters = {
    currentSong: state => {
        return state.palyList[state.currentIndex]
    }
}

export default getters
