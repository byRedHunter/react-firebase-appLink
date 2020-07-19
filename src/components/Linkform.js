import React, { useState, useEffect } from 'react'
import { db } from '../firebase'

import Swal from 'sweetalert2'

export const Linkform = ({ addOrEditLink, currentId, links }) => {
	const initialState = {
		url: '',
		name: '',
		description: '',
	}

	// para definir estados
	const [values, setValues] = useState(initialState)

	const hundleSubmit = (e) => {
		e.preventDefault()

		if (!validateURL(values.url)) {
			return Swal.fire('Upss', 'Link incorrect.', 'error')
		}

		addOrEditLink(values)

		setValues(initialState)
	}
	const hundleChange = (e) => {
		const { name, value } = e.target
		setValues({ ...values, [name]: value })
	}

	const validateURL = (str) => {
		return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
			str
		)
	}

	const getLinkById = async (id) => {
		const doc = await db.collection('links').doc(id).get()
		setValues({ ...doc.data() })
	}

	useEffect(() => {
		if (currentId === '') {
			setValues(initialState)
		} else {
			getLinkById(currentId)
		}
	}, [currentId]) // eslint-disable-line

	return (
		<form className='card card-body bg-primary' onSubmit={hundleSubmit}>
			<div className='form-group input-group'>
				<div className='input-group-text bg-light'>
					<i className='material-icons'>insert_link</i>
				</div>

				<input
					type='text'
					className='form-control'
					placeholder='https://someurl.com'
					name='url'
					value={values.url}
					onChange={hundleChange}
				/>
			</div>

			<div className='form-group input-group'>
				<div className='input-group-text bg-light'>
					<i className='material-icons'>create</i>
				</div>

				<input
					type='text'
					className='form-control'
					placeholder='Website Name'
					name='name'
					value={values.name}
					onChange={hundleChange}
				/>
			</div>

			<div className='form-group'>
				<textarea
					name='description'
					rows='3'
					className='form-control'
					placeholder='Write a description'
					value={values.description}
					onChange={hundleChange}
				></textarea>
			</div>

			<div className='form-group text-center'>
				<button className='btn btn-success px-5'>
					{currentId === '' ? 'Save' : 'Update'}
				</button>
			</div>
		</form>
	)
}

export default Linkform
