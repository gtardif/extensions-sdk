FROM --platform=$BUILDPLATFORM node:18.12-alpine3.16 AS client-builder
WORKDIR /ui
# cache packages in layer
COPY ui/package.json /ui/package.json
COPY ui/package-lock.json /ui/package-lock.json
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm ci
# install
COPY ui /ui
RUN npm run build

FROM alpine
LABEL org.opencontainers.image.title="Oauth sample" \
    org.opencontainers.image.description="This sample extension shows how to use Docker SSO within the extension" \
    org.opencontainers.image.vendor="Docker Inc." \
    com.docker.desktop.extension.api.version="0.3.3" \
    com.docker.extension.screenshots="" \
    com.docker.extension.detailed-description="This sample uses the standard auth0 library, using the react flavor. This library is also available in plain JS for single page apps. \nSeveral options are possible to implement SSO and connect to your SAAS services, this sample only shows how to implement SSO directly in your extension, it is also possible to reconcile accounts in your SAAS, before finally redirecting to the extension at the end of the login flow" \
    com.docker.extension.publisher-url="" \
    com.docker.extension.additional-urls="" \
    com.docker.extension.changelog=""

COPY metadata.json .
COPY docker.svg .
COPY --from=client-builder /ui/build ui
