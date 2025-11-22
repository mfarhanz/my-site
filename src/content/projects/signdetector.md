---
title: "Sign Detector"
description: "Simple road sign detection tool"
date: "2023-03-10"
tags: ["Python", "Tkinter", "Computer Vision"]
published: true
links:
  - text: "GitHub"
    url: "https://github.com/mfarhanz/Random-Scripts/tree/main/Sign%20Detection"
---

## Overview

**Sign Detector** is a small computer-vision based tool originally created as an academic project, built to detect road signs from either a live camera feed or still images. It includes a simple Tkinter-based GUI that displays real-time detection results using a connected camera, video file, or user-provided image.

## How It Works

The tool uses the <a href="https://github.com/ultralytics/yolov5" target="_blank" rel="noopener noreferrer">YOLOv5</a> object detection model, leveraging both **TensorFlow** and **PyTorch** under the hood. The GUI is built using **Tkinter**, with **Pillow** and **OpenCV** handling image loading, processing, and display.

It supports:

- Live camera feed detection  
- Video file detection  
- Static image detection  
- Terminal based error logging when run directly

## Execution

If you would like to try/experiment with this script:

1. Install dependencies:  
   `pip install -r requirements.txt coremltools onnx onnx-simplifier onnxruntime openvino-dev tensorflow-cpu`
2. Install and extract the YOLOv5 model (instructions <a href="https://github.com/ultralytics/yolov5" target="_blank" rel="noopener noreferrer">here</a>) to a directory.
3. Place <a href="https://github.com/mfarhanz/Random-Scripts/blob/main/Sign%20Detection/start.py" target="_blank" rel="noopener noreferrer">`start.py`</a> in the YOLOv5 main directory.
4. Run `start.py` (double-click or run `python start.py` in terminal).
5. For detecting an image or video, enter the file path in the UI and click **Detect**.
6. For detailed logging, run via terminal.
