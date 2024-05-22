import { RegisteredPlayerGameType } from "@/app/@types/types"
import { useGameStore } from "@/app/store"
import { useEffect } from "react"

export const useStartGame = (gameId: string, registeredPlayers: RegisteredPlayerGameType[]) => {
  const isNight = useGameStore((state) => state.isNight)
  const storedGameId = useGameStore((state) => state.gameId)
  const resetState = useGameStore((state) => state.resetState)
  const setGameId = useGameStore((state) => state.setGameId)
  const setRegisteredPlayers = useGameStore((state) => state.setRegisteredPlayers)
  const registeredStorePlayers = useGameStore((state) => state.registeredPlayers)

  useEffect(() => {
    setRegisteredPlayers(registeredPlayers)
    if (window.localStorage.getItem(`game-storage`) && !storedGameId && !isNight) {
      return
    }

    if (storedGameId && storedGameId !== gameId) {
      window.localStorage.setItem(`game-storage-${storedGameId}`, JSON.stringify(useGameStore.getState()))
      resetState()
    }

    if (storedGameId !== gameId && window.localStorage.getItem(`game-storage-${gameId}`)) {
      try {
        const storedData = JSON.parse(window.localStorage.getItem(`game-storage-${gameId}`)!)
        useGameStore.setState(storedData)
      } catch (error) {
        window.localStorage.removeItem(`game-storage-${gameId}`)
        window.location.reload()
      }
    }

    setGameId(gameId)
    setRegisteredPlayers(registeredPlayers)
  }, [storedGameId, gameId, isNight, registeredStorePlayers]);
}
