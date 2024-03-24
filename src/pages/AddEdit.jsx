import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useFirebaseContext } from '../context/FirebaseContext';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


const AddEdit = () => {
  const initialValues = {
    title: '',
    tags: '',
    trending: '',
    category: '',
    des: '',
    file: '',
  };
  const { id } = useParams()
  const navigate = useNavigate()
  const { handleBlogCreation, getDataById, handleDocUpdate } = useFirebaseContext()

  const [formData, setFormData] = useState(initialValues)

  const categoryOption = [
    "Fashion",
    "Technology",
    "Food",
    "Politics",
    "Business",
    "Sports"
  ]

  const handleSubmit = (values) => {
    if (values.title && values.tags && values.trending && values.category && values.des) {

      if (!id) {
        handleBlogCreation({ ...values, tags: values.tags.split(' ') })



        toast.success('Blog created Sucessfully')
      } else {
        handleDocUpdate({ ...values, tags: values.tags.split(' ') }, id)
        toast.success('Updated Sucessfully')
      }
      navigate('/')
    } else {
      toast.error('All fields are mandatory')
    }


  };

  const handleDataEdit = () => {
    getDataById(id).then((value) => setFormData(value.data()))
  }
  useEffect(() => {
    id && handleDataEdit()
  }, [id])

  console.log(formData)


  return (
    
      <div className="w-[90%] mx-auto mt-4">
        <h1 className='text-center text-2xl font-semibold'>{id ? 'Update Your Blog' : 'Create Your Blog'}</h1>
        <Formik initialValues={formData} onSubmit={handleSubmit} key={JSON.stringify(formData)}>
          {({ values, setValues, handleChange, setFieldValue }) => (
            <Form className="bg-white shadow-2xl shadow-indigo-800 rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                  Title
                </label>
                <Field type="text" id="title" name="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <ErrorMessage name="title" component="div" className="text-red-500 text-xs italic" />
              </div>

              <div className="mb-4">
                <label htmlFor="tags" className="block text-gray-700 text-sm font-bold mb-2">
                  Tag
                </label>



                {/* <ReactTagInput tags={values.tags} name="tags" placeholder='tags' /> */}

                <Field type="text" id="tags" name="tags" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <ErrorMessage name="tags" component="div" className="text-red-500 text-xs italic" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Is it trending ?
                </label>
                <div>
                  <label className="inline-flex items-center mr-4">
                    <Field type="radio" name="trending" value="yes" className="form-checkbox h-5 w-5 text-blue-500" />
                    <span className="ml-2 text-gray-700">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <Field type="radio" name="trending" value="no" className="form-checkbox h-5 w-5 text-red-500" />
                    <span className="ml-2 text-gray-700">No</span>
                  </label>
                </div>
                <ErrorMessage name="trending" component="div" className="text-red-500 text-xs italic" />
              </div>

              <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
                  Category
                </label>
                <Field as="select" id="category" name="category" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="">Select an option</option>
                  {categoryOption.map((category, index) => <option key={index} value={category}>{category}</option>)}


                </Field>
                <ErrorMessage name="category" component="div" className="text-red-500 text-xs italic" />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                  Description
                </label>
                <Field as="textarea" id="des" name="des" className="shadow  border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline" />
                <ErrorMessage name="description" component="div" className="text-red-500 text-xs italic" />
              </div>

              <div className="mb-4">
                <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">
                  Choose file
                </label>

                <input type="file" id='file' onChange={(e) =>
                  setFieldValue('file', e.target.files[0])
                } />

                <ErrorMessage name="file" component="div" className="text-red-500 text-xs italic" />
              </div>

              <div className="flex items-center justify-between">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  {id ? 'Update' : 'Create'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
   
  )

    ;
};

export default AddEdit;
