import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage.jsx';
import UserPage from "../pages/UserPage/UserPage.jsx";
import PageNotFound from "../pages/404/404.jsx";
import EditUserPage from "../pages/UserPage/EditUserPage.jsx";
import CreateUserPage from "../pages/UserPage/CreateUserPage.jsx";
import RolePage from "../pages/RolePage/RolePage.jsx";
import CreateRolePage from "../pages/RolePage/CreateRolePage.jsx";
import EditRolePage from "../pages/RolePage/EditRolePage.jsx";
import BlogPage from "../pages/BlogPage/BlogPage.jsx";
import CreateBlogPage from "../pages/BlogPage/CreateBlogPage.jsx";
import EditBlogPage from "../pages/BlogPage/EditBlogPage.jsx";
import FaqPage from "../pages/FaqPage/FaqPage.jsx";
import CreateFaqPage from "../pages/FaqPage/CreateFaqPage.jsx";
import EditFaqPage from "../pages/FaqPage/EditFaqPage.jsx";
import ImagePage from "../pages/DownloadPage/ImagePage.jsx";
import FilePage from "../pages/DownloadPage/FilePage.jsx";
import TypePage from "../pages/MemosPage/Type/TypePage.jsx";
import CreateTypePage from "../pages/MemosPage/Type/CreateTypePage.jsx";
import EditTypePage from "../pages/MemosPage/Type/EditTypePage.jsx";
import MemoPage from "../pages/MemosPage/Memo/MemoPage.jsx";
import CreateMemoPage from "../pages/MemosPage/Memo/CreateMemoPage.jsx";
import EditMemoPage from "../pages/MemosPage/Memo/EditMemoPage.jsx";
import VideoPage from "../pages/VideoPage/VideoPage.jsx";
import CreateVideoPage from "../pages/VideoPage/CreateVideoPage.jsx";
import EditVideoPage from "../pages/VideoPage/EditVideoPage.jsx";

const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path="/dashboard" element={<HomePage/>}/>
            <Route path="/users" exact element={<UserPage/>}/>
            <Route path="/users/:id/edit" element={<EditUserPage/>}/>
            <Route path="/users/create" element={<CreateUserPage/>}/>

            <Route path="/roles" exact element={<RolePage/>}/>
            <Route path="/roles/:id/edit" element={<EditRolePage/>}/>
            <Route path="/roles/create" element={<CreateRolePage/>}/>

            <Route path="/news" exact element={<BlogPage/>}/>
            <Route path="/news/:id/edit" element={<EditBlogPage/>}/>
            <Route path="/news/create" element={<CreateBlogPage/>}/>

            <Route path="/faqs" exact element={<FaqPage/>}/>
            <Route path="/faqs/:id/edit" element={<EditFaqPage/>}/>
            <Route path="/faqs/create" element={<CreateFaqPage/>}/>

            <Route path="/images" exact element={<ImagePage/>}/>
            <Route path="/files" exact element={<FilePage/>}/>

            <Route path="/users/memos/types" exact element={<TypePage/>}/>
            <Route path="/users/memos/types/:id/edit" element={<EditTypePage/>}/>
            <Route path="/users/memos/types/create" element={<CreateTypePage/>}/>

            <Route path="/users/memos" exact element={<MemoPage/>}/>
            <Route path="/users/memos/:id/edit" element={<EditMemoPage/>}/>
            <Route path="/users/memos/create" element={<CreateMemoPage/>}/>

            <Route path="/videos" exact element={<VideoPage/>}/>
            <Route path="/videos/:id/edit" element={<EditVideoPage/>}/>
            <Route path="/videos/create" element={<CreateVideoPage/>}/>

            <Route path="/404" element={<PageNotFound/>}/>
            <Route path="*" element={<Navigate to="/admin/dashboard"/>}/>
        </Routes>
    );
};

export default PrivateRoutes;
