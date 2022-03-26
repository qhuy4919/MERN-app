import React from 'react';
import './not-found.scss';
export function NotFound() {
  return (
    <div className="main-404">
        <div className="main-404-title">404</div>
        <div className="main-404-desc">
            <p>Có lẻ liên kết mà bạn tìm không tồn tại trên trang chủ chúng tôi, bạn. Điều đó có thể xảy ra khi bạn nhấp vào liên kết hoặc một cái gì đó đã bị xóa, hoặc có thể liên kết mà bạn nhấp vào không chính xác.</p>
            <p>Xin lỗi về sự bất tiện này nhấp vào liên kết bên dưới để quay lại.</p>
        </div>
        <ul className="main-404-redirect">
            <li><a href="#trangchu">Quay lại trang chủ</a></li>
            <li><a href="#support">Liên hệ hỗ trợ</a></li>
        </ul>
    </div>
  );
}
