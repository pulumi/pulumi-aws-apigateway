FROM gitpod/workspace-full

USER root

# Install latest pulumictl
RUN wget -O pulumictl.tar.gz $(curl -s https://api.github.com/repos/pulumi/pulumictl/releases/latest | jq -rc '.assets | map(select(.name | contains("linux-amd64"))) | .[] .browser_download_url') \
    && tar xzf pulumictl.tar.gz -C /usr/bin pulumictl \
    && rm -f pulumictl.tar.gz \
    && pulumictl version

USER gitpod

# Install .NET SDK (Current channel)
# Source: https://docs.microsoft.com/dotnet/core/install/linux-scripted-manual#scripted-install
RUN mkdir -p /home/gitpod/dotnet && curl -fsSL https://dot.net/v1/dotnet-install.sh | bash /dev/stdin --channel Current --install-dir /home/gitpod/dotnet
ENV DOTNET_ROOT=/home/gitpod/dotnet
ENV PATH=$PATH:/home/gitpod/dotnet

# Install latest Pulumi CLI
RUN curl -fsSL https://get.pulumi.com/ | bash;
ENV PATH=$PATH:/home/gitpod/.pulumi/bin/
