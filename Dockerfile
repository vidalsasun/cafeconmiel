#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM node:10.15-alpine AS client 
ARG skip_client_build=false 
WORKDIR /app 
COPY JrTech.Angular.Docker/ClientApp . 
RUN [[ ${skip_client_build} = true ]] && echo "Skipping npm install" || npm install 
RUN [[ ${skip_client_build} = true ]] && mkdir dist || npm run-script build

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["cafeconmiel.csproj", "."]
RUN dotnet restore "./cafeconmiel.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "cafeconmiel.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "cafeconmiel.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "cafeconmiel.dll"]