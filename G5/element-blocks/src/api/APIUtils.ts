namespace BlockPuzzle {
    export class APIUtils {
        private static _instance: APIUtils = null;
        public static get instance(): APIUtils {
            return APIUtils._instance ? APIUtils._instance :
                APIUtils._instance = new APIUtils();
        }

        public isRewardedVideoFeatureEnabled(): boolean {
            return !!enable_rewarded_videos;
        }

        public hasRewardedVideo(): boolean {
            if(Settings.ENABLE_API && this.isRewardedVideoFeatureEnabled() && window["famobi"].hasRewardedAd)
                return window["famobi"].hasRewardedAd();
            else return false;
        }

        public showRewardedVideo(callback: Function) {
            if(Settings.ENABLE_API && this.isRewardedVideoFeatureEnabled()) {
                (<any>window).famobi.rewardedAd(callback);
            } else {
                callback();
            }
        }

        public showAds(callback: Function, timeout: number = 0) {
            if(Settings.ENABLE_API) {
                if (timeout == 0) {
                    (<any>window).famobi.showAd(callback);
                } else {
                    setTimeout(function () {
                        (<any>window).famobi.showAd(callback);
                    }, timeout);
                }
            } else {
                callback();
            }
        }

    }
}