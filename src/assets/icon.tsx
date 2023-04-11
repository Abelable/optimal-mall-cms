import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const ExpressSvg = () => (
  <svg viewBox="0 0 1024 1024" width="1em" height="1em">
    <path
      d="M794.624 366.24A32.032 32.032 0 0 0 768 352h-32a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h128a32 32 0 0 0 32-32v-48c0-6.304-1.888-12.512-5.376-17.76l-96-144zM864 576h-128v-192h32l96 144V576z"
      fill="#ffffff"
      p-id="6057"
    ></path>
    <path
      d="M1007.872 490.752l-128-192A95.84 95.84 0 0 0 800 256h-128V192c0-52.928-43.072-96-96-96H96C43.072 96 0 139.072 0 192v352c0 52.928 43.072 96 96 96v96c0 52.928 43.072 96 96 96h36.544c14.304 55.072 64 96 123.488 96 59.424 0 109.12-40.928 123.424-96h169.024c14.304 55.072 64 96 123.488 96 59.424 0 109.12-40.928 123.424-96H928c52.928 0 96-43.072 96-96v-192c0-19.008-5.568-37.44-16.128-53.248zM96 576a32 32 0 0 1-32-32V192a32 32 0 0 1 32-32h480a32 32 0 0 1 32 32v352a32 32 0 0 1-32 32H96z m256.032 288a64 64 0 1 1 0-128 64 64 0 0 1 0 128zM768 864a64 64 0 1 1 0-128 64 64 0 0 1 0 128z m192-128a32 32 0 0 1-32 32h-36.576c-14.304-55.072-64-96-123.424-96-59.488 0-109.184 40.928-123.488 96h-169.024c-14.304-55.072-64-96-123.424-96-59.488 0-109.184 40.928-123.488 96H192a32 32 0 0 1-32-32v-96h416c52.928 0 96-43.072 96-96v-224h128c10.688 0 20.672 5.344 26.624 14.24l128 192c3.488 5.248 5.376 11.456 5.376 17.76v192z"
      fill="#ffffff"
      p-id="6058"
    ></path>
  </svg>
);

const ScenicSpotSvg = () => (
  <svg viewBox="0 0 1024 1024" width="1em" height="1em">
    <path
      d="M766.8224 854.4768h-512a25.6 25.6 0 0 0 0 51.2h512a25.6 25.6 0 0 0 0-51.2zM915.968 719.872l-164.7616-277.0944a39.4752 39.4752 0 0 0-34.2016-19.456 39.4752 39.4752 0 0 0-34.2016 19.456l-37.7856 63.5904-169.9328-285.7984c-8.0384-13.568-21.9136-20.3264-35.7888-20.3264s-27.6992 6.7584-35.7888 20.3264l-295.2192 496.4864a41.6256 41.6256 0 0 0 35.7888 62.9248h737.6896a39.7824 39.7824 0 0 0 34.2016-60.1088z m-397.8752 0c-0.5632 0.9216-0.768 1.9456-1.2288 2.8672H171.4688L439.296 272.3328l172.4416 289.9968-93.6448 157.5424z m255.6928 5.4272h-195.3792l1.536-2.56 63.5904-106.9568 33.28-55.9616 40.192-67.584 138.5984 233.0624h-81.8176zM736.5632 321.28a101.4784 101.4784 0 1 0 0-202.9568 101.4784 101.4784 0 0 0 0 202.9568z m0-151.7568a50.3296 50.3296 0 0 1 0 100.5568 50.3296 50.3296 0 0 1 0-100.5568z"
      p-id="12198"
      fill="#ffffff"
    ></path>
  </svg>
);

export const ExpressIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={ExpressSvg} {...props} />
);

export const ScenicSpotIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={ScenicSpotSvg} {...props} />
);
