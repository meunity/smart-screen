# 智慧视频

TODOLIST

 - [x] 报警显示
 - [x] 视频分页
 
 ## ffmpeg转换视频为rtsp流
 
 
```
ffmpeg -re -i D:\BaiduNetdiskDownload\video2.mp4 -rtsp_transport tcp -vcodec h264 -f rtsp rtsp://localhost/video1
```

## 启动EasyDarwin推流
[https://github.com/EasyDarwin/EasyDarwin](https://github.com/EasyDarwin/EasyDarwin)

## rtsp就地拉流
```
ffplay rtsp://localhost/video1
```

