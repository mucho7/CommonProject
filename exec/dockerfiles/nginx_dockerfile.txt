FROM nginx

COPY conf/nginx.conf /etc/nginx/nginx.conf
COPY fullchain.pem /etc/nginx/
COPY privkey.pem /etc/nginx/

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80