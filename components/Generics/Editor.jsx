import React from "react";
import {ErrorMessage, useField, useFormikContext} from "formik";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import SkeletonEditor from '../Utils/Ckeditor.js';
import colors from '../Utils/Colors';

export default function Editor({name, title, helper, required = false, height = '600'}){

    const [field, meta, helpers] = useField(name);
    const {setFieldValue, validateField} = useFormikContext();

    const editorConfiguration = {
        toolbar: {
            items: [
                'heading', 'fontSize', 'fontFamily', '|', 'bold', 'italic',
                'bulletedList', 'numberedList', '|', 'indent', 'outdent',
                'alignment', 'insertTable', '|', 'fontColor', 'fontBackgroundColor', '|',
                'link', 'imageUpload', 'mediaEmbed','|', 'undo', 'redo', '|','htmlEmbed'
            ]
        },
        image: {
            toolbar: [
                'linkImage',
                'imageTextAlternative',
                'imageStyle:inline',
                'imageStyle:alignLeft',
                'imageStyle:alignRight',
                'imageStyle:block',
                'imageStyle:side',
            ]
        },
        fontColor: {
            columns: 10,
            colors: [...colors],
        },
        fontBackgroundColor: {
            columns: 10,
            colors: [...colors],
        },
        heading: {
            options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'Заголовок 1', class: 'h1' },
                { model: 'heading2', view: 'h2', title: 'Заголовок 2', class: 'h2' },
                { model: 'heading3', view: 'h3', title: 'Заголовок 3', class: 'h3' },
                { model: 'heading4', view: 'h4', title: 'Заголовок 4', class: 'h4' },
                { model: 'heading5', view: 'h5', title: 'Заголовок 5', class: 'h5' },
                { model: 'heading6', view: 'h6', title: 'Заголовок 6', class: 'h6' }
            ]
        },
        mediaEmbed: {
            previewsInData: true
        },
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells',
                'tableCellProperties',
                'tableProperties'
            ]
        },
        language: 'ru'
    };

    const setCustomSettings = (editor) => {
        editor.editing.view.change( writer => {
            writer.setStyle( 'height', height + 'px', editor.editing.view.document.getRoot() );
        });
    };

    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">
                {title}
                {required && <span className="required">*</span>}
            </label>
            <CKEditor
                id={name}
                className="ck-error"
                editor={ SkeletonEditor }
                config={ editorConfiguration }
                data={field.value}
                onChange={(event, editor) => {
                    setFieldValue(name, editor.getData());
                }}
                onBlur={(event, editor) => {
                    validateField(name);
                }}
                onReady={ editor => setCustomSettings(editor) }
            />
            <ErrorMessage component="div" className="error form-text" name={name} />
            {helper && <div id={name + '-help'} className="form-text">{helper}</div>}
        </div>
    );
}
