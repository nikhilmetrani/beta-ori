

export interface Installer {
    rid: number;
    platform: string;
    os: string;
    downloadUrl: string;
    expressInstallCommand: string;
    selected: boolean;
    launchCommand: string;
    uninstallCommand: string;
}
