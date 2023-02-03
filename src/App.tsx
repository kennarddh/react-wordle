/* eslint-disable security/detect-object-injection */
import { FC, useState, Fragment, useEffect } from 'react'
import { Pick } from 'Utils/Array'

import { Container } from './AppStyles'

import WordsList from './Words'

type IWords = string[][]

const App: FC = () => {
	const [Words, SetWords] = useState<IWords>(() =>
		Array(5).fill(Array(5).fill(''))
	)

	const [CurrentIndex, SetCurrentIndex] = useState<number>(0)
	const [CurrentWordIndex, SetCurrentWordIndex] = useState<number>(0)

	const [CorrectWord] = useState<string>(() => Pick(WordsList))
	const [IsDone, SetIsDone] = useState<boolean>(false)

	useEffect(() => {
		if (IsDone) return

		const OnKeyDown = (event: KeyboardEvent) => {
			const validKeyRegex = /[a-z]/i

			if (CurrentIndex === Words.length) return

			if (
				event.key === 'Enter' &&
				CurrentWordIndex === 5 &&
				WordsList.includes(Words[CurrentIndex].join('').toLowerCase())
			) {
				if (
					Words[CurrentIndex].join('').toLowerCase() === CorrectWord
				) {
					SetIsDone(true)

					alert('done')

					return
				} else if (CurrentIndex === 4) {
					SetIsDone(true)

					alert(`Correct Word is ${CorrectWord}`)

					return
				}

				SetCurrentIndex(prev => prev + 1)
				SetCurrentWordIndex(0)

				return
			}

			if (event.key === 'Backspace' && CurrentWordIndex !== 0) {
				SetWords(prev => [
					...prev.slice(0, CurrentIndex),
					[
						...Words[CurrentIndex].slice(0, CurrentWordIndex - 1),
						...Array(
							Words[CurrentIndex].length - CurrentWordIndex + 1
						).fill(''),
					],
					...prev.slice(CurrentIndex + 1, Words.length),
				])

				SetCurrentWordIndex(prev => prev - 1)

				return
			}

			if (!validKeyRegex.test(event.key) || event.key.length !== 1) return

			if (CurrentWordIndex === 5) return

			SetWords(prev => [
				...prev.slice(0, CurrentIndex),
				[
					...Words[CurrentIndex].slice(0, CurrentWordIndex),
					event.key.toUpperCase(),
					...Words[CurrentIndex].slice(
						CurrentWordIndex + 1,
						Words[CurrentIndex].length
					),
				],
				...prev.slice(CurrentIndex + 1, Words.length),
			])

			SetCurrentWordIndex(prev => prev + 1)
		}

		addEventListener('keydown', OnKeyDown)

		return () => removeEventListener('keydown', OnKeyDown)
	}, [CorrectWord, CurrentIndex, CurrentWordIndex, IsDone, Words])

	return (
		<Container>
			{Words.map((word, i) => (
				<Fragment key={i}>
					{word.map((letter, i2) => (
						<p
							key={i2}
							style={{
								border: '1px solid #000',
								backgroundColor:
									i === CurrentIndex &&
									i2 === CurrentWordIndex
										? '#ffc2c2'
										: letter.toLowerCase() ===
												CorrectWord[i2] &&
										  i !== CurrentIndex // eslint-disable-line no-mixed-spaces-and-tabs
										? '#00ff00'
										: CorrectWord.includes(
												letter.toLowerCase()
										  ) && // eslint-disable-line no-mixed-spaces-and-tabs
										  letter !== '' && // eslint-disable-line no-mixed-spaces-and-tabs
										  i !== CurrentIndex // eslint-disable-line no-mixed-spaces-and-tabs
										? '#ffff00'
										: '#fff',
							}}
						>
							{letter}
						</p>
					))}
				</Fragment>
			))}
		</Container>
	)
}

export default App
