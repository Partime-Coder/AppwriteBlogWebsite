import { Editor } from '@tinymce/tinymce-react'
import React from 'react'
import { Controller } from 'react-hook-form'
import conf from '../../conf/cong'




function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className='w-full'>
            {label && <label className="inline-block mb-1 pl-1">{label}</label>}

            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey={conf.EditorAPI}
                        initialValue={defaultValue}
                        init={{
                            height: 500,
                            menubar: true,

                            plugins: [
                                'advlist autolink lists link image charmap preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table help wordcount'
                            ],

                            toolbar:
                                'undo redo | formatselect | ' +
                                'bold italic | forecolor backcolor | ' +
                                'alignleft aligncenter alignright | ' +
                                'bullist numlist | removeformat',

                            mobile: {
                                menubar: false,
                                height: 280,
                                plugins: ['lists link'],
                                toolbar:
                                    'undo redo | bold italic | bullist numlist | link',
                            },

                            content_style:
                                'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; }',
                        }}
                        onEditorChange={onChange}
                    />
                )}
            >

            </Controller>
        </div>
    )
}

export default RTE