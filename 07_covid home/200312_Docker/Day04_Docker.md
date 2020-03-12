window10 education 이라서 docker toolbox를 설치함.

https://gwonsungjun.github.io/articles/2018-01/DockerInstall



![1_Docker Toolbox Installed](.\1_Docker Toolbox Installed.png)

고래 귀엽당 ㅎㅎ 버전 확인

![1_Docker Toolbox Installed](.\2_Docker Install Check.png)



어떤 컨테이너들이 깔려 있는지 확인, 지워보기!

![1_Docker Toolbox Installed](.\3_ps rm images.png)



jenkins 실습

![1_Docker Toolbox Installed](.\4_jenkins.png)

포트 포워딩 해줘야 함 - Oracle VM VirtualBox에서 

docker-machine stop default | docker-machine start default

![1_Docker Toolbox Installed](.\5_Port Forwarding.png)

![1_Docker Toolbox Installed](.\6_Unlock Jenkins.png)

비번 입력하고 뭘 설치 하는데 안 되서 그냥 컨티뉴 했다..



Skeleton 코드 기반 프론트 도커 이미지 제작

![image-20200312200602974](./7_Docker front image.png)



Skeleton 코드 기반 백 도커 이미지 제작

![image-20200312200602974](./8_Docker back image.png)

