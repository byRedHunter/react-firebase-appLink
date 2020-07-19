import React, { useEffect, useState } from 'react'

import Swal from 'sweetalert2'
import { db } from '../firebase'

// components
import LinkForm from './Linkform'

const Links = () => {
	const [links, setLinks] = useState([])
	const [currentId, setCurrentId] = useState('')

	const addOrEditLink = async (linkObject) => {
		const { url, name, description } = linkObject
		let newTask = {
			url,
			name,
			description,
		}

		if (currentId === '') {
			if (!url || !name || !description) {
				Swal.fire('Upss!!', 'Complete all fields please.', 'warning')
			} else {
				await db.collection('links').doc().set(newTask)
				Swal.fire('Great!!', 'Task added successfully.', 'success')
			}
		} else {
			await db.collection('links').doc(currentId).update(newTask)
			Swal.fire('Great!!', 'Task updated successfully.', 'success')

			setCurrentId('')
		}
	}

	const onDeleteLink = async (id) => {
		const result = await Swal.fire({
			title: 'Warning!!!',
			text: 'Are you sure you want to delete this link?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		})

		if (result.isConfirmed) {
			await db.collection('links').doc(id).delete()
			Swal.fire('Deleted!', 'Your task has been deleted.', 'success')
		}
	}

	const getLinks = async () => {
		// onSnapshot se ejecuta cada vez que hay un cambio en la db
		db.collection('links').onSnapshot((querySnapshot) => {
			const docs = []

			querySnapshot.forEach((doc) => {
				docs.push({ ...doc.data(), id: doc.id })
			})

			setLinks(docs)
		})
	}

	// se ejecuta siempre que carga la pagina
	useEffect(() => {
		getLinks()
	}, [])

	return (
		<div className='col-12'>
			<div className='col-12 col-md-5 mx-auto mb-4'>
				<LinkForm {...{ addOrEditLink, currentId, links }} />
			</div>

			<div className='col-12 col-md-7 mx-auto'>
				{links.map((link) => {
					return (
						<div
							className='card mt-2'
							style={{ background: '#8BC34A' }}
							key={link.id}
						>
							<div className='card-body'>
								<div className='d-flex justify-content-between'>
									<h3 className='card-title'>{link.name}</h3>
									<div>
										<i
											style={{ cursor: 'pointer' }}
											className='material-icons text-danger'
											onClick={() => {
												onDeleteLink(link.id)
											}}
										>
											close
										</i>
										<i
											style={{ cursor: 'pointer' }}
											className='material-icons text-primary'
											onClick={() => setCurrentId(link.id)}
										>
											create
										</i>
									</div>
								</div>
								<p className='text-dark'>{link.description}</p>
								<a
									className='btn btn-info'
									target='_blank'
									href={link.url}
									rel='noopener noreferrer'
								>
									Visit Website
								</a>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Links
