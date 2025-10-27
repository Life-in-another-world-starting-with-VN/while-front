# Docker 배포 가이드

## 빠른 시작

### 개발 환경
```bash
# 로컬에서 개발 서버 실행
npm run dev
```

### Docker로 프로덕션 빌드 및 실행

#### 방법 1: Docker Compose 사용 (권장)
```bash
# 빌드 및 실행
docker-compose up -d

# 로그 확인
docker-compose logs -f

# 중지
docker-compose down

# 재빌드
docker-compose up -d --build
```

앱 접속: http://localhost:3000

#### 방법 2: Docker 명령어 직접 사용
```bash
# 이미지 빌드
docker build -t while-frontend:latest .

# 컨테이너 실행
docker run -d -p 3000:80 --name while-frontend while-frontend:latest

# 로그 확인
docker logs -f while-frontend

# 컨테이너 중지 및 삭제
docker stop while-frontend
docker rm while-frontend
```

## Docker 파일 구조

### Dockerfile
- **Multi-stage build**: 빌드 단계와 실행 단계 분리
- **Stage 1 (builder)**: Node.js 환경에서 앱 빌드
- **Stage 2 (production)**: Nginx 환경에서 정적 파일 서빙
- 최종 이미지 크기 최적화

### docker-compose.yml
- 서비스 정의 및 네트워크 설정
- 포트 매핑: 3000 (호스트) → 80 (컨테이너)
- 자동 재시작 설정

### .dockerignore
- 불필요한 파일 제외하여 빌드 속도 향상
- node_modules, dist 등 제외

## 환경 변수 설정

환경 변수가 필요한 경우 `.env` 파일 생성:

```env
# API 서버 주소
VITE_API_URL=https://api.example.com

# 기타 설정
VITE_APP_NAME=While Game
```

Docker Compose에서 사용:
```yaml
services:
  while-frontend:
    environment:
      - VITE_API_URL=${VITE_API_URL}
```

## 프로덕션 최적화

### Nginx 설정 (선택사항)

`nginx.conf` 파일 생성:
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip 압축
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # SPA 라우팅 지원
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 정적 파일 캐싱
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Dockerfile에서 활성화:
```dockerfile
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

## Docker 명령어 치트시트

### 빌드 및 실행
```bash
# 이미지 빌드
docker build -t while-frontend:latest .

# 이미지 빌드 (캐시 무시)
docker build --no-cache -t while-frontend:latest .

# 컨테이너 실행
docker run -d -p 3000:80 --name while-frontend while-frontend:latest

# 컨테이너 실행 (환경 변수 포함)
docker run -d -p 3000:80 --env-file .env --name while-frontend while-frontend:latest
```

### 관리
```bash
# 실행 중인 컨테이너 확인
docker ps

# 모든 컨테이너 확인 (중지된 것 포함)
docker ps -a

# 로그 확인
docker logs while-frontend
docker logs -f while-frontend  # 실시간 로그

# 컨테이너 내부 접속
docker exec -it while-frontend sh

# 컨테이너 중지
docker stop while-frontend

# 컨테이너 삭제
docker rm while-frontend

# 이미지 삭제
docker rmi while-frontend:latest
```

### 정리
```bash
# 중지된 모든 컨테이너 삭제
docker container prune

# 사용하지 않는 이미지 삭제
docker image prune

# 전체 정리 (주의!)
docker system prune -a
```

## Docker Compose 명령어

```bash
# 시작 (백그라운드)
docker-compose up -d

# 시작 (포그라운드, 로그 확인)
docker-compose up

# 중지
docker-compose down

# 재시작
docker-compose restart

# 로그 확인
docker-compose logs
docker-compose logs -f  # 실시간 로그

# 특정 서비스 재빌드
docker-compose up -d --build while-frontend

# 전체 재빌드
docker-compose up -d --build

# 서비스 스케일링
docker-compose up -d --scale while-frontend=3
```

## 문제 해결

### 포트가 이미 사용 중
```bash
# 포트 사용 확인
lsof -i :3000

# 다른 포트 사용
docker run -d -p 8080:80 --name while-frontend while-frontend:latest
```

### 빌드 실패
```bash
# 캐시 없이 재빌드
docker build --no-cache -t while-frontend:latest .

# node_modules 삭제 후 재빌드
rm -rf node_modules
docker-compose up -d --build
```

### 컨테이너가 시작하지 않음
```bash
# 로그 확인
docker logs while-frontend

# 컨테이너 내부 확인
docker exec -it while-frontend sh
```

### 이미지 크기가 너무 큼
Multi-stage build를 사용하여 최적화되어 있지만, 추가 최적화:
```dockerfile
# Alpine 이미지 사용
FROM node:20-alpine

# 불필요한 파일 제외
.dockerignore 파일 확인
```

## CI/CD 통합

### GitHub Actions 예제
```yaml
name: Build and Deploy

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Build Docker image
        run: docker build -t while-frontend:latest .

      - name: Run tests
        run: docker run while-frontend:latest npm test

      - name: Push to registry
        run: |
          docker tag while-frontend:latest registry.example.com/while-frontend:latest
          docker push registry.example.com/while-frontend:latest
```

## 보안 권장사항

1. **최신 베이스 이미지 사용**
   ```bash
   docker pull node:20-alpine
   docker pull nginx:alpine
   ```

2. **취약점 스캔**
   ```bash
   docker scan while-frontend:latest
   ```

3. **비밀 정보 관리**
   - `.env` 파일을 Git에 커밋하지 않기
   - Docker secrets 또는 환경 변수 사용

4. **컨테이너 권한 제한**
   ```bash
   docker run -d -p 3000:80 --read-only --name while-frontend while-frontend:latest
   ```

## 모니터링

### 리소스 사용량 확인
```bash
# 실시간 모니터링
docker stats while-frontend

# 모든 컨테이너 모니터링
docker stats
```

### 헬스 체크
```yaml
# docker-compose.yml에 추가
services:
  while-frontend:
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## 프로덕션 배포

### AWS ECR
```bash
# ECR 로그인
aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.ap-northeast-2.amazonaws.com

# 이미지 태그
docker tag while-frontend:latest <account-id>.dkr.ecr.ap-northeast-2.amazonaws.com/while-frontend:latest

# 푸시
docker push <account-id>.dkr.ecr.ap-northeast-2.amazonaws.com/while-frontend:latest
```

### Docker Hub
```bash
# 로그인
docker login

# 이미지 태그
docker tag while-frontend:latest username/while-frontend:latest

# 푸시
docker push username/while-frontend:latest
```

## 참고 자료

- [Docker 공식 문서](https://docs.docker.com/)
- [Docker Compose 공식 문서](https://docs.docker.com/compose/)
- [Nginx 공식 문서](https://nginx.org/en/docs/)
